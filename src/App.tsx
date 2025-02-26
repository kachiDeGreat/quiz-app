import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { questionBank, Question } from "./questions";
import "./App.css";
import Footer from "./Footer";

// Define the structure of a submission
interface Submission {
  fullName: string;
  regNumber: string;
  answers: { [key: string]: string };
  score: number;
}

const App: React.FC = () => {
  // State for questions, selected questions, answers, and timer
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(12 * 60); // 12 minutes in seconds
  const [score, setScore] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Preloader state

  // Select 25 random questions on component mount
  useEffect(() => {
    const shuffledQuestions = questionBank.sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 25));
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(true); // Auto-submit without confirmation
      return;
    }

    if (isQuizStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizStarted]);

  // Handle page reload or close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isQuizStarted && !hasSubmitted) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
        handleSubmit(true); // Auto-submit without confirmation
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isQuizStarted, hasSubmitted]);

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Calculate score and display results
  const handleSubmit = async (isAutoSubmit: boolean = false) => {
    if (!isAutoSubmit) {
      // Show confirmation dialog only if not auto-submitting
      const isConfirmed = window.confirm("Are you sure you want to submit?");
      if (!isConfirmed) {
        return; // Cancel submission if user clicks "No"
      }
    }

    setIsSubmitting(true); // Show full-page spinner

    let correctAnswers = 0;
    selectedQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const submission: Submission = {
      fullName,
      regNumber,
      answers,
      score: correctAnswers,
    };

    // Save submission to localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push(submission);
    localStorage.setItem("submissions", JSON.stringify(submissions));

    // Send data to Google Sheets via a proxy
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbzs6D-f6g3aSS_2UmHyPDvVn6pAQFkPSYYThzC3hBhVUvrv8h5EJw9_XbF2Ojo4xTl6/exec`,
        {
          method: "POST",
          body: JSON.stringify({
            fullName,
            regNumber,
            score: `${correctAnswers}/${selectedQuestions.length}`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json(); // Parse the response as JSON
        if (result.success) {
          // Only mark as submitted if the data is successfully sent
          setScore(correctAnswers);
          setHasSubmitted(true);
          toast.success("Quiz submitted!", {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          throw new Error(
            result.message || "Failed to submit, reload page and try again!"
          );
        }
      } else {
        // Handle non-JSON responses (e.g., HTML error pages)
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }
    } catch (error) {
      toast.error("Failed to submit, reload page and try again!", {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error(error);

      // Allow the user to retry the submission
      setHasSubmitted(false); // Reset submission state
      setScore(null); // Reset score
    } finally {
      setIsSubmitting(false); // Hide full-page spinner
    }
  };
  // Format time (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Check if the student has already submitted
  const checkSubmission = () => {
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    const hasSubmitted = submissions.some(
      (submission: Submission) => submission.regNumber === regNumber
    );
    return hasSubmitted;
  };

  // Validate registration number format
  const validateRegNumber = (regNumber: string): boolean => {
    const regex = /^\d{2}\/\d{5,10}(TR)?$/;
    return regex.test(regNumber);
  };

  // Handle quiz start
  const handleStartQuiz = () => {
    if (!fullName || !regNumber) {
      toast.error("Enter full name and reg number.", {
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    if (!validateRegNumber(regNumber)) {
      toast.error("Invalid reg num.", {
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    if (checkSubmission()) {
      toast.error("Can't submit quiz 2 times.", {
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    setIsQuizStarted(true);
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
              Please enter your <strong>Full Name</strong> and{" "}
              <strong>Reg Num</strong> to begin. The quiz consists of 25
              questions, and you will have <strong>12 minutes</strong> to
              complete it. If you do not finish within the time limit, the quiz
              will <strong>auto-submit</strong>. Do not refresh the page as this
              will <strong>auto-submit</strong> your answers and prevent you
              from continuing. Once the quiz is submitted (or auto-submitted),
              you <strong>cannot retake it</strong>.
            </p>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Registration Number (e.g., 12/3456789 or 12/34567890TR)"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
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
                onClick={() => handleSubmit(false)} // Manual submission
                className="submit-button"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </center>
          </div>
        ) : (
          <div className="results">
            <h2>Quiz Submitted!</h2>
            {/* <p>Thank you for submitting!</p> */}
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer />
      </div>

      {/* Full-Page Spinner */}
      {isSubmitting && (
        <div className="full-page-spinner-overlay">
          <div className="full-page-spinner"></div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default App;
