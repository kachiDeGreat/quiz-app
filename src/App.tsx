import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { questionBank, Question } from "./questions";
import { students } from "./students";
import "./App.css";
import Footer from "./Footer";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const App: React.FC = () => {
  // State variables
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [score, setScore] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkingSubmission, setCheckingSubmission] = useState<boolean>(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [isValidStudent, setIsValidStudent] = useState<boolean>(false);

  // Select random questions
  useEffect(() => {
    const shuffledQuestions = questionBank.sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 30));
  }, []);

  // Auto-populate full name and validate student
  useEffect(() => {
    if (regNumber.trim()) {
      const student = students.find(
        (s) => s.matricNumber.toLowerCase() === regNumber.trim().toLowerCase()
      );
      if (student) {
        setFullName(
          `${student.surname} ${student.firstName} ${student.otherNames}`.trim()
        );
        setIsValidStudent(true);
      } else {
        setFullName("");
        setIsValidStudent(false);
      }
    } else {
      setFullName("");
      setIsValidStudent(false);
    }
  }, [regNumber]);

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
  const checkExistingSubmission = async (regNumber: string) => {
    setCheckingSubmission(true);
    try {
      const q = query(
        collection(db, "quizSubmissions"),
        where("regNumber", "==", regNumber.trim().toUpperCase())
      );
      const querySnapshot = await getDocs(q);
      const exists = !querySnapshot.empty;
      setAlreadySubmitted(exists);
      return exists;
    } catch (error) {
      console.error("Firebase error:", error);
      setAlreadySubmitted(true); // Fail safe - assume submission exists
      return true;
    } finally {
      setCheckingSubmission(false);
    }
  };

  // Handle quiz start
  const handleStartQuiz = async () => {
    if (!regNumber) {
      toast.error("Enter your registration number", {
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    // Check Firebase for existing submission
    const hasSubmitted = await checkExistingSubmission(regNumber);
    if (hasSubmitted) {
      toast.error("You've already submitted this quiz.", {
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    setIsQuizStarted(true);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Submit quiz
  const handleSubmit = async (isAutoSubmit: boolean = false) => {
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
      await addDoc(collection(db, "quizSubmissions"), {
        fullName,
        regNumber: regNumber.trim().toUpperCase(),
        score: correctAnswers,
        totalQuestions: selectedQuestions.length,
        timestamp: serverTimestamp(),
      });
      setScore(correctAnswers);
      setHasSubmitted(true);
      toast.success("Quiz submitted successfully!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit. Please try again.", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Navigation handlers
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

  return (
    <>
      <div className="quiz-app">
        <h1>RAD 222 Online Test</h1>
        {!isQuizStarted ? (
          <div className="start-screen">
            <p style={{ color: "crimson" }}>
              Please enter your <strong>Registration Number</strong> to begin.
              The quiz consists of 30 questions, and you will have{" "}
              <strong>15 minutes</strong> to complete it. If you do not finish
              within the time limit, the quiz will <strong>auto-submit</strong>.
              Do not refresh the page as this will <strong>auto-submit</strong>{" "}
              your answers and prevent you from continuing. Once the quiz is
              submitted (or auto-submitted), you{" "}
              <strong>cannot retake it</strong>.
            </p>

            <input
              type="text"
              placeholder="Registration Number (e.g., 12/3456789 or 12/34567890TR)"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              readOnly
              className="disabled-input"
            />

            <center>
              <br />
              {
                /* <button
                style={{ width: "auto" }}
                onClick={handleStartQuiz}
                disabled={
                  checkingSubmission ||
                  alreadySubmitted ||
                  !isValidStudent ||
                  !regNumber.trim()
                }
              >
                {alreadySubmitted
                  ? "Already Submitted"
                  : checkingSubmission
                  ? "Checking..."
                  : !isValidStudent && regNumber.trim()
                  ? "Invalid Registration"
                  : !regNumber.trim()
                  ? "Start Quiz"
                  : "Start Quiz"}
              </button> */
                <button
                  style={{ width: "auto" }}
                  onClick={handleStartQuiz}
                  disabled={
                    checkingSubmission ||
                    alreadySubmitted ||
                    !isValidStudent ||
                    !regNumber.trim()
                  }
                  className={
                    checkingSubmission ||
                    alreadySubmitted ||
                    !isValidStudent ||
                    !regNumber.trim()
                      ? "disabled-button"
                      : ""
                  }
                >
                  {alreadySubmitted
                    ? "Already Submitted"
                    : checkingSubmission
                    ? "Checking..."
                    : !isValidStudent && regNumber.trim()
                    ? "Invalid Registration"
                    : !regNumber.trim()
                    ? "Start Test"
                    : "Start Test"}
                </button>
              }
              <br />
              <p style={{ marginTop: "20px", textAlign: "center" }}>
                Website by{" "}
                <a
                  style={{ fontWeight: "bold" }}
                  href="https://wa.link/nxg54p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kachidegreat
                </a>
              </p>
            </center>
          </div>
        ) : score === null ? (
          <div className="quiz-screen">
            <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            <div className="question-navigation">
              {selectedQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`question-box ${
                    currentQuestionIndex === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="question">
              <h3>{selectedQuestions[currentQuestionIndex].text}</h3>
              {selectedQuestions[currentQuestionIndex].options.map((option) => (
                <label key={option}>
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
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="navigation-buttons">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === selectedQuestions.length - 1}
              >
                Next
              </button>
            </div>
            <center>
              <button
                className="submit-button"
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </button>
              <p style={{ marginTop: "20px", textAlign: "center" }}>
                Website by{" "}
                <a
                  style={{ fontWeight: "bold" }}
                  href="https://wa.link/nxg54p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kachidegreat
                </a>
              </p>
            </center>
          </div>
        ) : (
          <div className="results">
            <h2>Quiz Submitted!</h2>
            {/* <p>
              Your score: {score}/{selectedQuestions.length}
            </p> */}
          </div>
        )}
        <ToastContainer />
      </div>
      {isSubmitting && (
        <div className="full-page-spinner-overlay">
          <div className="full-page-spinner"></div>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default App;
