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
  // ---------------------------------------------------------
  // 1. STATE & REFS
  // ---------------------------------------------------------
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
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>("");
  const [showCameraWarning, setShowCameraWarning] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const submissionInProgressRef = useRef<boolean>(false);
  const hasCheatedRef = useRef<boolean>(false);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const quizContainerRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------
  // 2. HELPER FUNCTIONS (Defined BEFORE useEffects)
  // ---------------------------------------------------------

  const showWarning = (message: string) => {
    toast(message, {
      icon: "⚠️",
      style: { background: "#F59E0B", color: "#000" },
    });
  };

  const sha256 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      cameraStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const stopMonitoring = () => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    // We do NOT stop the camera here during monitoring, only on unmount/submit
    // But for safety in this specific function:
    // stopCamera(); // Optional: kept camera running usually until full unmount
  };

  const requestCameraAccess = async (): Promise<boolean> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser");
      }

      // If existing stream, just ensure playback
      if (cameraStreamRef.current && videoRef.current) {
        if (videoRef.current.srcObject !== cameraStreamRef.current) {
          videoRef.current.srcObject = cameraStreamRef.current;
        }
        await videoRef.current.play();
        return true;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 320 },
          height: { ideal: 240 },
        },
        audio: false,
      });

      cameraStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.display = "block";

        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn("Autoplay prevented:", playError);
        }
      }

      setHasCameraAccess(true);
      setIsCameraActive(true);
      return true;
    } catch (error) {
      console.error("Camera access error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown camera error";
      setCameraError(errorMessage);
      setHasCameraAccess(false);
      setIsCameraActive(false);
      return false;
    }
  };

  const logCheatingEvent = (type: string, details?: string) => {
    if (hasSubmitted || submissionInProgressRef.current) return;
    const event: CheatingEvent = { type, timestamp: new Date(), details };
    setCheatingEvents((prev) => [...prev, event]);
    console.log(`[Anti-Cheat] ${type}: ${details || ""}`);
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

  const startMonitoring = async () => {
    try {
      if (!isCameraActive) {
        const cameraSuccess = await requestCameraAccess();
        if (!cameraSuccess) {
          toast.error("Camera access is required for the quiz");
          setIsQuizStarted(false);
          return;
        }
      }
      captureIntervalRef.current = setInterval(captureScreen, 30000);
      logCheatingEvent("MONITORING_STARTED", "Monitoring started");
    } catch (error) {
      logCheatingEvent("MONITORING_FAILED", "Could not start monitoring");
    }
  };

  // ---------------------------------------------------------
  // 3. SUBMISSION LOGIC (Needs to be before Effects using it)
  // ---------------------------------------------------------

  const forceImmediateSubmit = async (reason: string) => {
    if (hasSubmitted || submissionInProgressRef.current) return;

    submissionInProgressRef.current = true;
    setIsSubmitting(true);

    const correctAnswers = selectedQuestions.reduce(
      (count, question) =>
        answers[question.id] === question.correctAnswer ? count + 1 : count,
      0
    );

    try {
      // Check for existing submission logic...
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

        // Update registration...
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

      setScore(correctAnswers);
      setHasSubmitted(true);

      if (reason === "TIME_EXPIRED") toast.error("Time's up! Quiz submitted.");
      else toast.error(`Quiz submitted due to: ${reason}`);

      stopMonitoring();
      stopCamera(); // Stop camera on submit

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      setTimeout(() => onBackToVerification(), 2000);
    } catch (error) {
      console.error("Submission failed:", error);
      // Fallback
      setHasSubmitted(true);
      setScore(correctAnswers);
      setTimeout(() => onBackToVerification(), 2000);
    } finally {
      submissionInProgressRef.current = false;
      setIsSubmitting(false);
    }
  };

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
          autoSubmitReason: "",
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

        // Update registration...
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
      stopCamera(); // Stop camera on manual submit

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setTimeout(() => onBackToVerification(), 3000);
    } catch (error) {
      console.error("Manual submit error", error);
      toast.error("Submission failed.");
    } finally {
      submissionInProgressRef.current = false;
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------------------
  // 4. USE EFFECTS (Now defined AFTER functions)
  // ---------------------------------------------------------

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

  // Select random questions
  useEffect(() => {
    const shuffledQuestions = [...questionBank].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 30));
  }, []);

  // INITIALIZE CAMERA ON MOUNT
  // Now stopCamera is defined, so this won't error
  useEffect(() => {
    const initCamera = async () => {
      if (!alreadySubmitted) {
        await requestCameraAccess();
      }
    };
    initCamera();

    return () => {
      stopCamera();
    };
  }, [alreadySubmitted]);

  // Handle Fullscreen Camera Disconnect
  useEffect(() => {
    const maintainVideoPlayback = () => {
      if (videoRef.current && cameraStreamRef.current) {
        if (!videoRef.current.srcObject) {
          videoRef.current.srcObject = cameraStreamRef.current;
        }
        if (videoRef.current.paused) {
          videoRef.current
            .play()
            .catch((e) => console.log("Playback resume failed", e));
        }
      }
    };

    document.addEventListener("fullscreenchange", maintainVideoPlayback);
    document.addEventListener("webkitfullscreenchange", maintainVideoPlayback);
    document.addEventListener("mozfullscreenchange", maintainVideoPlayback);
    document.addEventListener("MSFullscreenChange", maintainVideoPlayback);

    return () => {
      document.removeEventListener("fullscreenchange", maintainVideoPlayback);
      document.removeEventListener(
        "webkitfullscreenchange",
        maintainVideoPlayback
      );
      document.removeEventListener(
        "mozfullscreenchange",
        maintainVideoPlayback
      );
      document.removeEventListener("MSFullscreenChange", maintainVideoPlayback);
    };
  }, []);

  // Fullscreen, Timer, Tab Switching, Keydown, ContextMenu Effects...
  // (These rely on forceImmediateSubmit which is now defined)

  useEffect(() => {
    if (isQuizStarted && !isFullScreen) {
      setTimeout(() => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element
            .requestFullscreen()
            .then(() => setIsFullScreen(true))
            .catch(console.error);
        }
      }, 500);
    }
  }, [isQuizStarted]);

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
        toast.error("Fullscreen exit detected! Submitting quiz immediately...");
        forceImmediateSubmit("FULLSCREEN_EXIT");
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, [isQuizStarted, hasSubmitted]);

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

  // Start monitoring when quiz starts
  useEffect(() => {
    if (isQuizStarted && !hasSubmitted && !submissionInProgressRef.current) {
      startMonitoring();
    }
    return () => {
      // Cleanup monitoring interval on unmount/stop
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, [isQuizStarted, hasSubmitted]);

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

  // ---------------------------------------------------------
  // 5. EVENT HANDLERS
  // ---------------------------------------------------------

  const handleStartQuiz = async () => {
    if (alreadySubmitted) {
      toast.error("You've already submitted this quiz.");
      return;
    }
    if (!isCameraActive) {
      const success = await requestCameraAccess();
      if (!success) {
        toast.error("Camera access is required. Please check permissions.");
        return;
      }
    }
    setIsQuizStarted(true);
    setShowCameraWarning(false);
    logCheatingEvent("QUIZ_STARTED", `Device: ${deviceFingerprint}`);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const showSubmitConfirmation = () => {
    if (hasSubmitted || submissionInProgressRef.current) return;
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => setShowSubmitModal(false);

  const handleConfirmedSubmit = async () => {
    setShowSubmitModal(false);
    await handleManualSubmit();
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
    <div className={styles.container} ref={quizContainerRef}>
      <canvas ref={hiddenCanvasRef} style={{ display: "none" }} />
      <video
        ref={videoRef}
        className={styles.cameraFeed}
        autoPlay
        muted
        playsInline
      />

      {showSubmitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
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
              </div>
              <div className={styles.warningNote}>
                <p>
                  ⚠️ <strong>Important:</strong> Once submitted, you cannot
                  retake the quiz.
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
                <span className={styles.label}>Reg Number:</span>
                <span className={styles.value}>{userData.regNumber}</span>
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
                <strong>Camera access is REQUIRED</strong> and monitored
              </li>
              <li>
                <strong>Fullscreen mode is required</strong>
              </li>
            </ul>

            <div className={styles.cameraWarning}>
              <p>
                <strong>⚠️ CHECK YOUR CAMERA:</strong> Your camera feed should
                appear in the bottom-right corner now. If not, please allow
                permissions.
              </p>
            </div>

            <button className={styles.startButton} onClick={handleStartQuiz}>
              Start Quiz (Enter Fullscreen)
            </button>
            {cameraError && (
              <div className={styles.cameraError}>
                <p>Camera Error: {cameraError}</p>
              </div>
            )}
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

          <div className={styles.cameraStatus}>
            <div
              className={`${styles.cameraIndicator} ${
                isCameraActive ? styles.active : styles.inactive
              }`}
            >
              <span className={styles.cameraDot}></span>
              {isCameraActive ? "Camera Active" : "Camera Disconnected"}
            </div>
          </div>

          <div className={styles.quizHeader}>
            <h2 className={styles.quizTitle}>NSC 203 Online Test</h2>
            <div className={styles.quizInfo}>
              <div className={`${styles.timer} ${getTimeLeftClass()}`}>
                <span className={styles.timerLabel}>Time Left:</span>
                <span className={styles.timerValue}>
                  {formatTime(timeLeft)}
                </span>
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
              {selectedQuestions[currentQuestionIndex]?.text}{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontSize: "0.5rem",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                scroll down to see more options{" "}
              </span>
            </h3>
            <div className={styles.options}>
              {selectedQuestions[currentQuestionIndex]?.options.map(
                (option) => (
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
                )
              )}
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
