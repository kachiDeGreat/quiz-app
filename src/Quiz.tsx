import type React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

  // Select random questions
  useEffect(() => {
    const shuffledQuestions = [...questionBank].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 30));
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) handleSubmit(true);
    if (isQuizStarted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizStarted]);

  // Prevent window close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isQuizStarted && !hasSubmitted) {
        e.preventDefault();
        e.returnValue = "";
        handleSubmit(true);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
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

  const handleStartQuiz = () => {
    if (alreadySubmitted) {
      toast.error("You've already submitted this quiz.");
      return;
    }
    setIsQuizStarted(true);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    if (!isAutoSubmit && !window.confirm("Are you sure you want to submit?")) {
      return;
    }

    setIsSubmitting(true);
    const correctAnswers = selectedQuestions.reduce(
      (count, question) =>
        answers[question.id] === question.correctAnswer ? count + 1 : count,
      0
    );

    try {
      await tryBatchWrite(correctAnswers, isAutoSubmit);
      setScore(correctAnswers);
      setHasSubmitted(true);
      toast.success("Quiz submitted successfully!");
    } catch (batchError) {
      console.error("Batch error:", batchError);
      toast.warning("Batch submission failed, trying individual writes...");

      try {
        await tryIndividualWrites(correctAnswers, isAutoSubmit);
        setScore(correctAnswers);
        setHasSubmitted(true);
        toast.success("Quiz submitted successfully!");
      } catch (individualError) {
        console.error("Individual write error:", individualError);
        toast.error(
          individualError instanceof Error
            ? `Submission failed: ${individualError.message}`
            : "Submission failed"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const tryBatchWrite = async (
    correctAnswers: number,
    isAutoSubmit: boolean
  ) => {
    const batch = writeBatch(db);

    // Add quiz submission
    const submissionRef = doc(collection(db, "quizSubmissions"));
    batch.set(submissionRef, {
      fullName: userData.fullName,
      regNumber: userData.regNumber,
      email: userData.email,
      studentId: userData.studentId,
      score: correctAnswers,
      totalQuestions: selectedQuestions.length,
      isAutoSubmitted: isAutoSubmit,
      timestamp: serverTimestamp(),
    });

    // Update registration record
    const registrationQuery = query(
      collection(db, "registrations"),
      where("studentId", "==", userData.studentId)
    );
    const registrationSnapshot = await getDocs(registrationQuery);

    if (!registrationSnapshot.empty) {
      const registrationRef = doc(
        db,
        "registrations",
        registrationSnapshot.docs[0].id
      );
      batch.update(registrationRef, {
        score: correctAnswers,
        quizSubmitted: true,
        submittedAt: serverTimestamp(),
      });
    }

    await batch.commit();
  };

  const tryIndividualWrites = async (
    correctAnswers: number,
    isAutoSubmit: boolean
  ) => {
    // Add quiz submission
    await addDoc(collection(db, "quizSubmissions"), {
      fullName: userData.fullName,
      regNumber: userData.regNumber,
      email: userData.email,
      studentId: userData.studentId,
      score: correctAnswers,
      totalQuestions: selectedQuestions.length,
      isAutoSubmitted: isAutoSubmit,
      timestamp: serverTimestamp(),
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
        }
      );
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
              <li>Do not refresh the page or navigate away</li>
              <li>Once submitted, you cannot retake the quiz</li>
            </ul>
            <button className={styles.startButton} onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      ) : score === null ? (
        <div className={styles.quizScreen}>
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
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            <button
              className={styles.navButton}
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === selectedQuestions.length - 1}
            >
              Next →
            </button>
          </div>

          <button
            className={`${styles.submitButton} ${
              isSubmitting ? styles.submitting : ""
            }`}
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
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

              {/* <div className={styles.scoreSection}>
                <div className={styles.scoreCard}>
                  <div className={styles.scoreNumber}>
                    {score}/{selectedQuestions.length}
                  </div>
                  <div className={styles.scorePercentage}>
                    {Math.round((score / selectedQuestions.length) * 100)}%
                  </div>
                  <div className={styles.scoreLabel}>Final Score</div>
                </div>
              </div> */}
            </div>

            <button
              className={styles.finishButton}
              onClick={onBackToVerification}
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
