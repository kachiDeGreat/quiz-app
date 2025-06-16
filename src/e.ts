import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { questionBank, Question } from "./questions";
import { students } from "./students";
import "./App.css";
import Footer from "./Footer";

interface Submission {
  fullName: string;
  regNumber: string;
  answers: { [key: string]: string };
  score: number;
}

const App: React.FC = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(12 * 60);
  const [score, setScore] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Select 25 random questions on component mount
  useEffect(() => {
    const shuffledQuestions = questionBank.sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 25));
  }, []);

  // Auto-populate full name when reg number changes
  useEffect(() => {
    if (regNumber.trim()) {
      const student = students.find(
        (s) => s.matricNumber.toLowerCase() === regNumber.trim().toLowerCase()
      );
      setFullName(
        student
          ? `${student.surname} ${student.firstName} ${student.otherNames}`.trim()
          : ""
      );
    } else {
      setFullName("");
    }
  }, [regNumber]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(true);
      return;
    }

    if (isQuizStarted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizStarted]);

  // Handle page reload or close
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

  // Check if registration number exists in Google Sheets
  const checkSubmissionInSheets = async (
    regNumber: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
        {
          method: "POST",
          body: JSON.stringify({ action: "check", regNumber }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error("Error checking submission:", error);
      toast.error("Error verifying submission status. Please try again.");
      return false;
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Handle quiz submission
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
      const response = await fetch(
        "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
        {
          method: "POST",
          body: JSON.stringify({
            action: "submit",
            fullName,
            regNumber,
            score: `${correctAnswers}/${selectedQuestions.length}`,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setScore(correctAnswers);
      setHasSubmitted(true);
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      toast.error(error.message || "Submission failed. Please try again.");
      setHasSubmitted(false);
      setScore(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle quiz start
  const handleStartQuiz = async () => {
    if (!regNumber) {
      toast.error("Please enter your registration number");
      return;
    }

    const studentExists = students.some(
      (s) => s.matricNumber.toLowerCase() === regNumber.trim().toLowerCase()
    );

    if (!studentExists) {
      toast.error("You did not register for this test");
      return;
    }

    try {
      const alreadySubmitted = await checkSubmissionInSheets(regNumber);
      if (alreadySubmitted) {
        toast.error("You've already submitted this quiz");
        return;
      }
      setIsQuizStarted(true);
    } catch (error) {
      toast.error("Error verifying submission status");
    }
  };

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="quiz-app">
        <h1>Nursing Informatics (NSC371) Online Test</h1>
        {!isQuizStarted ? (
          <div className="start-screen">
            <p>
              Please enter your <strong>Registration Number</strong> to begin.
              The quiz consists of 25 questions, and you will have{" "}
              <strong>12 minutes</strong> to complete it. If you do not finish
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
              disabled
            />

            <center>
              <br />
              <button onClick={handleStartQuiz}>Start Quiz</button>
              <br />
            </center>
          </div>
        ) : score === null ? (
          <div className="quiz-screen">
            <div className="timer">Time Left: {formatTime(timeLeft)}</div>

            {/* Question Navigation Bar */}
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
              {selectedQuestions[currentQuestionIndex].options.map(
                (option: string) => (
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
                )
              )}
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
                onClick={() => handleSubmit(false)}
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </center>
          </div>
        ) : (
          <div className="results">
            <h2>Quiz Submitted!</h2>
          </div>
        )}

        <ToastContainer />
      </div>

      {isSubmitting && (
        <div className="full-page-spinner-overlay">
          <div className="full-page-spinner"></div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default App;
