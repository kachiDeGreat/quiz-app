import type React from "react";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { questionBank, type Question } from "./questions_with_answers";
import {
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import styles from "./quiz.module.css";

interface QuizProps {
  userData: {
    fullName: string;
    regNumber: string;
    email: string;
    studentId: string;
  };
  onBackToVerification: () => void;
}

interface CheatingEvent {
  type: string;
  timestamp: Date;
  details?: string;
}

const Quiz: React.FC<QuizProps> = ({ userData, onBackToVerification }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [score, setScore] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [cheatingEvents, setCheatingEvents] = useState<CheatingEvent[]>([]);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>("");
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const submissionInProgressRef = useRef<boolean>(false);
  const hasCheatedRef = useRef<boolean>(false);

  // Helper function for warning toasts
  const showWarning = (message: string) => {
    toast(message, {
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#000",
      },
    });
  };

  // Initialize device fingerprint
  useEffect(() => {
    const generateDeviceFingerprint = async () => {
      const components = [
        navigator.userAgent,
        navigator.platform,
        navigator.language,
        window.screen.colorDepth,
        window.screen.width,
        window.screen.height,
        new Date().getTimezoneOffset(),
        !!navigator.cookieEnabled,
        !!navigator.doNotTrack,
        navigator.hardwareConcurrency || "unknown",
        navigator.maxTouchPoints || "unknown",
      ];

      const fingerprint = components.join("|");
      const hash = await sha256(fingerprint);
      setDeviceFingerprint(hash);
    };

    generateDeviceFingerprint();
  }, []);

  // SHA-256 hash function
  const sha256 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  // Select random questions
  useEffect(() => {
    const shuffledQuestions = [...questionBank].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 30));
  }, []);

  // Request fullscreen when quiz starts
  useEffect(() => {
    if (isQuizStarted && !isFullScreen) {
      requestFullScreen();
    }
  }, [isQuizStarted]);

  // Fullscreen request
  const requestFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => {
          logCheatingEvent(
            "FULLSCREEN_DENIED",
            `Failed to enter fullscreen: ${err.message}`
          );
          showWarning("Fullscreen mode is required for the quiz");
        });
    }
  };

  // Detect fullscreen changes - IMMEDIATE SUBMISSION ON EXIT
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullScreen(isFull);

      if (
        isQuizStarted &&
        !isFull &&
        !hasSubmitted &&
        !submissionInProgressRef.current
      ) {
        logCheatingEvent("FULLSCREEN_EXIT", "User exited fullscreen mode");
        hasCheatedRef.current = true;

        // IMMEDIATE SUBMISSION - no confirmation
        toast.error("Fullscreen exit detected! Submitting quiz immediately...");
        forceImmediateSubmit("FULLSCREEN_EXIT");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isQuizStarted, hasSubmitted]);

  // Tab visibility detection - IMMEDIATE SUBMISSION AFTER 3 SWITCHES
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        isQuizStarted &&
        document.hidden &&
        !hasSubmitted &&
        !submissionInProgressRef.current
      ) {
        setTabSwitchCount((prev) => {
          const newCount = prev + 1;
          logCheatingEvent("TAB_SWITCH", `Switched tabs ${newCount} time(s)`);

          if (newCount >= 3) {
            hasCheatedRef.current = true;
            toast.error(
              "Excessive tab switching detected! Submitting quiz immediately..."
            );
            forceImmediateSubmit("EXCESSIVE_TAB_SWITCHING");
          } else {
            showWarning(`Warning: Tab switch detected (${newCount}/3)`);
          }
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isQuizStarted, hasSubmitted]);

  // Prevent context menu (right-click)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (isQuizStarted && !hasSubmitted && !submissionInProgressRef.current) {
        e.preventDefault();
        logCheatingEvent("CONTEXT_MENU_ATTEMPT", "Right-click attempted");
        showWarning("Right-click is disabled during the quiz");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, [isQuizStarted, hasSubmitted]);

  // Prevent keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isQuizStarted || hasSubmitted || submissionInProgressRef.current)
        return;

      const forbiddenKeys = ["F12", "F5", "F11", "PrintScreen"];
      const forbiddenCombinations = [
        { key: "c", ctrl: true },
        { key: "v", ctrl: true },
        { key: "u", ctrl: true },
        { key: "i", ctrl: true, shift: true },
        { key: "j", ctrl: true, shift: true },
        { key: "k", ctrl: true, shift: true },
        { key: "r", ctrl: true },
        { key: "r", meta: true },
      ];

      if (forbiddenKeys.includes(e.key)) {
        e.preventDefault();
        logCheatingEvent("KEYBOARD_SHORTCUT", `Attempted to use ${e.key}`);
        showWarning("This keyboard shortcut is disabled during the quiz");
        return;
      }

      for (const combo of forbiddenCombinations) {
        if (
          e.key.toLowerCase() === combo.key &&
          (combo.ctrl ? e.ctrlKey : true) &&
          (combo.shift ? e.shiftKey : true) &&
          (combo.meta ? e.metaKey : true)
        ) {
          e.preventDefault();
          logCheatingEvent(
            "KEYBOARD_SHORTCUT",
            `Attempted to use Ctrl+${combo.key.toUpperCase()}`
          );
          showWarning("Keyboard shortcuts are disabled during the quiz");
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isQuizStarted, hasSubmitted]);

  // Timer logic - IMMEDIATE SUBMISSION WHEN TIME EXPIRES
  useEffect(() => {
    if (timeLeft === 0 && !hasSubmitted && !submissionInProgressRef.current) {
      toast.error("Time's up! Submitting quiz...");
      forceImmediateSubmit("TIME_EXPIRED");
    }

    if (isQuizStarted && !hasSubmitted && !submissionInProgressRef.current) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizStarted, hasSubmitted]);

  // Prevent window close and navigation - IMMEDIATE SUBMISSION
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isQuizStarted && !hasSubmitted && !submissionInProgressRef.current) {
        e.preventDefault();
        e.returnValue = "";

        // Try to submit before window closes
        if (!hasCheatedRef.current) {
          hasCheatedRef.current = true;
          forceImmediateSubmit("WINDOW_CLOSE");
        }
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (isQuizStarted && !hasSubmitted && !submissionInProgressRef.current) {
        e.preventDefault();
        logCheatingEvent(
          "BROWSER_BACK_BUTTON",
          "Attempted to use browser back button"
        );
        hasCheatedRef.current = true;
        forceImmediateSubmit("BROWSER_NAVIGATION");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isQuizStarted, hasSubmitted]);

  // Start monitoring when quiz starts
  useEffect(() => {
    if (isQuizStarted && !hasSubmitted && !submissionInProgressRef.current) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [isQuizStarted, hasSubmitted]);

  const startMonitoring = async () => {
    try {
      captureIntervalRef.current = setInterval(captureScreen, 30000);
      logCheatingEvent("MONITORING_STARTED", "Screen monitoring started");
    } catch (error) {
      logCheatingEvent("MONITORING_FAILED", "Could not start monitoring");
    }
  };

  const stopMonitoring = () => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }
  };

  const captureScreen = () => {
    if (
      !hiddenCanvasRef.current ||
      hasSubmitted ||
      submissionInProgressRef.current
    )
      return;

    const canvas = hiddenCanvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    try {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#333";
      context.font = "14px Arial";
      context.fillText(`Student: ${userData.fullName}`, 10, 20);
      context.fillText(`Time: ${new Date().toLocaleTimeString()}`, 10, 40);
      context.fillText(
        `Quiz in progress - Question ${currentQuestionIndex + 1}`,
        10,
        60
      );

      const imageData = canvas.toDataURL("image/jpeg", 0.1);
      setCapturedImages((prev) => [...prev.slice(-9), imageData]);
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  };

  const logCheatingEvent = (type: string, details?: string) => {
    if (hasSubmitted || submissionInProgressRef.current) return;

    const event: CheatingEvent = {
      type,
      timestamp: new Date(),
      details,
    };

    setCheatingEvents((prev) => [...prev, event]);
    console.log(`[Anti-Cheat] ${type}: ${details || ""}`);
  };

  // Check if user has already submitted
  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const q = query(
          collection(db, "quizSubmissions"),
          where("studentId", "==", userData.studentId)
        );
        const querySnapshot = await getDocs(q);
        setAlreadySubmitted(!querySnapshot.empty);
      } catch (error) {
        console.error("Error checking submission:", error);
      }
    };
    checkSubmission();
  }, [userData.studentId]);

  const handleStartQuiz = () => {
    if (alreadySubmitted) {
      toast.error("You've already submitted this quiz.");
      return;
    }

    if (!document.fullscreenEnabled) {
      showWarning("Fullscreen mode is required to start the quiz");
      return;
    }

    setIsQuizStarted(true);
    logCheatingEvent("QUIZ_STARTED", `Device: ${deviceFingerprint}`);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Show custom submit confirmation modal
  const showSubmitConfirmation = () => {
    if (hasSubmitted || submissionInProgressRef.current) return;
    setShowSubmitModal(true);
  };

  // Close modal
  const closeSubmitModal = () => {
    setShowSubmitModal(false);
  };

  // Handle manual submission after confirmation
  const handleConfirmedSubmit = async () => {
    setShowSubmitModal(false);
    await handleManualSubmit();
  };

  // IMMEDIATE SUBMISSION FUNCTION - NO CONFIRMATION (for cheating)
  const forceImmediateSubmit = async (reason: string) => {
    // Prevent multiple immediate submissions
    if (hasSubmitted || submissionInProgressRef.current) {
      console.log("Submission already in progress or completed");
      return;
    }

    submissionInProgressRef.current = true;
    setIsSubmitting(true);

    // Calculate score immediately
    const correctAnswers = selectedQuestions.reduce(
      (count, question) =>
        answers[question.id] === question.correctAnswer ? count + 1 : count,
      0
    );

    try {
      // Check if already submitted to prevent duplicates
      const submissionCheck = query(
        collection(db, "quizSubmissions"),
        where("studentId", "==", userData.studentId)
      );
      const existingSubmissions = await getDocs(submissionCheck);

      if (existingSubmissions.empty) {
        // Add quiz submission
        await addDoc(collection(db, "quizSubmissions"), {
          fullName: userData.fullName,
          regNumber: userData.regNumber,
          email: userData.email,
          studentId: userData.studentId,
          score: correctAnswers,
          totalQuestions: selectedQuestions.length,
          isAutoSubmitted: true,
          autoSubmitReason: reason,
          cheatingEvents: cheatingEvents.map((event) => ({
            type: event.type,
            timestamp: event.timestamp,
            details: event.details,
          })),
          tabSwitchCount,
          deviceFingerprint,
          capturedImages: capturedImages.slice(0, 5),
          timestamp: serverTimestamp(),
          flaggedForReview: true,
        });

        // Update registration
        const registrationQuery = query(
          collection(db, "registrations"),
          where("studentId", "==", userData.studentId)
        );
        const registrationSnapshot = await getDocs(registrationQuery);

        if (!registrationSnapshot.empty) {
          await updateDoc(
            doc(db, "registrations", registrationSnapshot.docs[0].id),
            {
              score: correctAnswers,
              quizSubmitted: true,
              submittedAt: serverTimestamp(),
              cheatingEvents: cheatingEvents.length,
              tabSwitchCount,
              deviceFlagged: true,
            }
          );
        }
      }

      // Set local state
      setScore(correctAnswers);
      setHasSubmitted(true);

      // Show appropriate message
      if (reason === "TIME_EXPIRED") {
        toast.error("Time's up! Quiz submitted.");
      } else {
        toast.error(`Quiz submitted due to: ${reason}`);
      }

      // Stop all monitoring
      stopMonitoring();

      // Exit fullscreen if still in it
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      // Immediately go back to verification
      setTimeout(() => {
        onBackToVerification();
      }, 2000);
    } catch (error) {
      console.error("Immediate submission failed:", error);

      // Detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }

      toast.error(
        "Auto-submission failed. Your attempt has been recorded locally."
      );

      setHasSubmitted(true);
      setScore(correctAnswers);

      setTimeout(() => {
        onBackToVerification();
      }, 2000);
    } finally {
      submissionInProgressRef.current = false;
      setIsSubmitting(false);
    }
  };

  // MANUAL SUBMISSION
  const handleManualSubmit = async () => {
    if (hasSubmitted || submissionInProgressRef.current) return;

    submissionInProgressRef.current = true;
    setIsSubmitting(true);

    const correctAnswers = selectedQuestions.reduce(
      (count, question) =>
        answers[question.id] === question.correctAnswer ? count + 1 : count,
      0
    );

    try {
      const submissionCheck = query(
        collection(db, "quizSubmissions"),
        where("studentId", "==", userData.studentId)
      );
      const existingSubmissions = await getDocs(submissionCheck);

      if (existingSubmissions.empty) {
        await addDoc(collection(db, "quizSubmissions"), {
          fullName: userData.fullName,
          regNumber: userData.regNumber,
          email: userData.email,
          studentId: userData.studentId,
          score: correctAnswers,
          totalQuestions: selectedQuestions.length,
          isAutoSubmitted: false,
          autoSubmitReason: "", // Changed from null to empty string
          cheatingEvents: cheatingEvents.map((event) => ({
            type: event.type,
            timestamp: event.timestamp,
            details: event.details,
          })),
          tabSwitchCount,
          deviceFingerprint,
          capturedImages: capturedImages.slice(0, 5),
          timestamp: serverTimestamp(),
          flaggedForReview: cheatingEvents.length > 0 || tabSwitchCount > 0,
        });

        const registrationQuery = query(
          collection(db, "registrations"),
          where("studentId", "==", userData.studentId)
        );
        const registrationSnapshot = await getDocs(registrationQuery);

        if (!registrationSnapshot.empty) {
          await updateDoc(
            doc(db, "registrations", registrationSnapshot.docs[0].id),
            {
              score: correctAnswers,
              quizSubmitted: true,
              submittedAt: serverTimestamp(),
              cheatingEvents: cheatingEvents.length,
              tabSwitchCount,
              deviceFlagged: cheatingEvents.length > 0,
            }
          );
        }
      }

      setScore(correctAnswers);
      setHasSubmitted(true);
      toast.success("Quiz submitted successfully!");

      stopMonitoring();

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      setTimeout(() => {
        onBackToVerification();
      }, 3000);
    } catch (error) {
      console.error("Manual submission failed:", error);

      // More detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);

        if (error.message.includes("permission")) {
          toast.error("Permission denied. Please check Firebase rules.");
        } else if (error.message.includes("network")) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(`Submission failed: ${error.message}`);
        }
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } finally {
      submissionInProgressRef.current = false;
      setIsSubmitting(false);
    }
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const getTimeLeftClass = () => {
    if (timeLeft <= 60) return styles.timeWarning;
    if (timeLeft <= 300) return styles.timeCaution;
    return "";
  };

  // Calculate answered questions
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = selectedQuestions.length;

  if (alreadySubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.centerCard}>
          <div className={styles.iconWrapper}>
            <div className={styles.checkIcon}>✓</div>
          </div>
          <h1 className={styles.title}>Quiz Already Submitted</h1>
          <div className={styles.messageCard}>
            <p className={styles.message}>
              You have already submitted this quiz.
            </p>
            <button
              className={styles.primaryButton}
              onClick={onBackToVerification}
            >
              Back to Verification
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <canvas ref={hiddenCanvasRef} style={{ display: "none" }} />

      {/* Custom Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              {/* <h3 className={styles.modalTitle}>Submit Quiz</h3> */}
              <button
                className={styles.modalCloseBtn}
                onClick={closeSubmitModal}
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalIcon}>⚠️</div>
              <p className={styles.modalMessage}>
                Are you sure you want to submit your quiz?
              </p>

              <div className={styles.quizStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Questions Answered:</span>
                  <span className={styles.statValue}>
                    {answeredQuestions}/{totalQuestions}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Time Remaining:</span>
                  <span className={styles.statValue}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Current Question:</span>
                  <span className={styles.statValue}>
                    {currentQuestionIndex + 1}/{totalQuestions}
                  </span>
                </div>
              </div>

              <div className={styles.warningNote}>
                <p>
                  ⚠️ <strong>Important:</strong> Once submitted, you cannot
                  retake the quiz.
                </p>
                <p>
                  Make sure you have answered all questions before submitting.
                </p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalCancelBtn}
                onClick={closeSubmitModal}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className={styles.modalSubmitBtn}
                onClick={handleConfirmedSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Yes, Submit Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isQuizStarted ? (
        <div className={styles.startScreen}>
          <div className={styles.header}>
            <h1 className={styles.courseTitle}>NSC 203 Online Test</h1>
            <div className={styles.studentInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Student:</span>
                <span className={styles.value}>{userData.fullName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Registration Number:</span>
                <span className={styles.value}>{userData.regNumber}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Student ID:</span>
                <span className={styles.value}>{userData.studentId}</span>
              </div>
            </div>
          </div>

          <div className={styles.instructionsCard}>
            <h2 className={styles.instructionsTitle}>Quiz Instructions</h2>
            <ul className={styles.instructionsList}>
              <li>The quiz consists of 30 multiple-choice questions</li>
              <li>You have 15 minutes to complete the quiz</li>
              <li>The quiz will auto-submit when time expires</li>
              <li>
                <strong>Fullscreen mode is required</strong> - exiting
                fullscreen will immediately submit your quiz
              </li>
              <li>
                <strong>Tab switching is monitored</strong> - 3 tab switches
                will immediately submit your quiz
              </li>
              <li>Keyboard shortcuts (Ctrl+C, Ctrl+V, etc.) are disabled</li>
              <li>Right-click is disabled during the quiz</li>
              <li>Do not refresh the page or navigate away</li>
              <li>Once submitted, you cannot retake the quiz</li>
              <p className={styles.warningText}>
                <strong>⚠️ WARNING:</strong> Any violation of rules will result
                in immediate quiz submission
              </p>
            </ul>

            <button className={styles.startButton} onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      ) : score === null ? (
        <div className={styles.quizScreen}>
          {!isFullScreen && (
            <div className={styles.fullscreenWarning}>
              ⚠️ WARNING: You must stay in fullscreen mode. Exiting will submit
              your quiz!
            </div>
          )}

          <div className={styles.quizHeader}>
            <h2 className={styles.quizTitle}>NSC 203 Online Test</h2>
            <div className={styles.quizInfo}>
              <div className={`${styles.timer} ${getTimeLeftClass()}`}>
                <span className={styles.timerLabel}>Time Left:</span>
                <span className={styles.timerValue}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className={styles.progress}>
                <span className={styles.progressLabel}>Question:</span>
                <span className={styles.progressValue}>
                  {currentQuestionIndex + 1}/{selectedQuestions.length}
                </span>
              </div>
              <div className={styles.tabSwitchWarning}>
                <span className={styles.warningLabel}>Tab Switches:</span>
                <span className={styles.warningValue}>{tabSwitchCount}/3</span>
              </div>
            </div>
          </div>

          <div className={styles.questionNavigation}>
            {selectedQuestions.map((_, index) => (
              <button
                key={index}
                className={`${styles.questionNavBtn} ${
                  currentQuestionIndex === index ? styles.active : ""
                } ${
                  answers[selectedQuestions[index].id] ? styles.answered : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className={styles.questionContainer}>
            <h3 className={styles.questionText}>
              {selectedQuestions[currentQuestionIndex].text}
            </h3>
            <div className={styles.options}>
              {selectedQuestions[currentQuestionIndex].options.map((option) => (
                <label key={option} className={styles.option}>
                  <input
                    type="radio"
                    name={selectedQuestions[currentQuestionIndex].id}
                    value={option}
                    checked={
                      answers[selectedQuestions[currentQuestionIndex].id] ===
                      option
                    }
                    onChange={() =>
                      handleAnswerSelect(
                        selectedQuestions[currentQuestionIndex].id,
                        option
                      )
                    }
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  <span className={styles.optionText}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.navigationButtons}>
            <button
              className={styles.navButton}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || hasSubmitted}
            >
              ← Previous
            </button>
            <button
              className={styles.navButton}
              onClick={handleNextQuestion}
              disabled={
                currentQuestionIndex === selectedQuestions.length - 1 ||
                hasSubmitted
              }
            >
              Next →
            </button>
          </div>

          <button
            className={`${styles.submitButton} ${
              isSubmitting ? styles.submitting : ""
            }`}
            onClick={showSubmitConfirmation}
            disabled={isSubmitting || hasSubmitted}
          >
            {isSubmitting
              ? "Submitting..."
              : hasSubmitted
              ? "Submitted"
              : "Submit Quiz"}
          </button>
        </div>
      ) : (
        <div className={styles.resultsScreen}>
          <div className={styles.resultsCard}>
            <div className={styles.successIcon}>🎉</div>
            <h1 className={styles.resultsTitle}>Quiz Completed!</h1>
            <h2 className={styles.thanksMessage}>
              Thank you for completing the quiz!
            </h2>

            <div className={styles.resultDetails}>
              <div className={styles.studentDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Student:</span>
                  <span className={styles.detailValue}>
                    {userData.fullName}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    Registration Number:
                  </span>
                  <span className={styles.detailValue}>
                    {userData.regNumber}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Student ID:</span>
                  <span className={styles.detailValue}>
                    {userData.studentId}
                  </span>
                </div>
              </div>
            </div>

            <p className={styles.redirectMessage}>
              Redirecting back to verification...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
