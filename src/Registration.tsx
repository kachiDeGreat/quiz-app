import React, { useState } from "react";
import toast from "react-hot-toast"; // Changed from react-toastify
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  or,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./Registration.css";

interface RegistrationProps {
  onRegistrationComplete: (userData: {
    fullName: string;
    regNumber: string;
    email: string;
    studentId: string;
  }) => void;
  quizActive: boolean;
  userData: {
    fullName: string;
    regNumber: string;
    email: string;
    studentId: string;
  } | null;
}

const Registration: React.FC<RegistrationProps> = ({
  onRegistrationComplete,
  quizActive,
  userData,
}) => {
  const [regNumber, setRegNumber] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [checkingRegistration, setCheckingRegistration] =
    useState<boolean>(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(false);

  // Helper for warnings
  const showWarning = (message: string) => {
    toast(message, {
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#000",
      },
    });
  };

  const generateStudentId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let result = "";

    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 3; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
  };

  const checkExistingRegistration = async (
    regNumber: string,
    email: string
  ) => {
    setCheckingRegistration(true);
    try {
      const q = query(
        collection(db, "registrations"),
        or(
          where("regNumber", "==", regNumber.trim().toUpperCase()),
          where("email", "==", email.trim().toLowerCase())
        )
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();

        // Check if the existing record matches both regNumber and email
        if (
          data.regNumber === regNumber.trim().toUpperCase() &&
          data.email === email.trim().toLowerCase()
        ) {
          setFullName(data.fullName || "");
          setEmail(data.email || "");
          setAlreadyRegistered(true);
          return { exists: true, isCompleteMatch: true };
        }

        // Check which field caused the conflict
        if (data.regNumber === regNumber.trim().toUpperCase()) {
          toast.error("This registration number is already registered");
          return { exists: true, isCompleteMatch: false };
        }

        if (data.email === email.trim().toLowerCase()) {
          toast.error("This email address is already registered");
          return { exists: true, isCompleteMatch: false };
        }
      }

      return { exists: false, isCompleteMatch: false };
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Error checking registration status");
      return { exists: false, isCompleteMatch: false };
    } finally {
      setCheckingRegistration(false);
    }
  };

  const handleRegistration = async () => {
    if (!regNumber.trim()) {
      toast.error("Please enter your registration number");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // First check if user is already registered
    const { exists, isCompleteMatch } = await checkExistingRegistration(
      regNumber,
      email
    );
    if (exists) {
      if (isCompleteMatch) {
        setAlreadyRegistered(true);
      }
      return;
    }

    setIsRegistering(true);

    try {
      const studentId = generateStudentId();

      await addDoc(collection(db, "registrations"), {
        fullName: fullName.trim(),
        regNumber: regNumber.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        studentId,
        timestamp: serverTimestamp(),
        score: null,
        quizSubmitted: false,
      });

      // Success toast with custom styling for long message
      toast.success(
        `Registration successful! Your Student ID is: ${studentId}`,
        {
          duration: 10000,
          style: {
            background: "#10B981",
            color: "#fff",
            maxWidth: "500px",
          },
        }
      );

      // Additional info toast
      // toast("Please save this ID - you'll need it to access the quiz.", {
      //   icon: "📝",
      //   duration: 8000,
      //   style: {
      //     background: "#3B82F6",
      //     color: "#fff",
      //   },
      // });

      onRegistrationComplete({
        fullName: fullName.trim(),
        regNumber: regNumber.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        studentId,
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleProceedWithExisting = () => {
    onRegistrationComplete({
      fullName,
      regNumber: regNumber.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      studentId: "",
    });
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>NCS 301 Online Test</h1>
          <h2>Student Registration</h2>
          <div className={`status-badge ${quizActive ? "active" : "inactive"}`}>
            {quizActive ? "Quiz Active" : "Quiz Inactive"}
          </div>
        </div>

        {userData && !quizActive ? (
          <div className="registration-success">
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h3>Registration Successful!</h3>
              <div className="user-details">
                <p>
                  <strong>Student:</strong> {userData.fullName}
                </p>
                <p>
                  <strong>Registration Number:</strong> {userData.regNumber}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Your Student ID:</strong> {userData.studentId}
                </p>
                <div className="id-notice">
                  <p>
                    ⚠️ Please save this ID - you'll need it to access the quiz
                  </p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📅</div>
              <h4>Quiz Not Yet Available</h4>
              <p>
                The NCS 301 Online Test is not currently active. We will notify
                registered students when the quiz becomes available.
              </p>
            </div>

            {/* <button
              className="secondary-button"
              onClick={() => window.location.reload()}
            >
              Register Another Student
            </button> */}
          </div>
        ) : (
          <div className="registration-form">
            <p className="form-description">
              {quizActive
                ? "Complete your registration to access the quiz."
                : "Register now to be eligible for the quiz when it becomes available."}
            </p>

            {!quizActive && (
              <div className="info-card">
                <p>
                  <strong>Note:</strong> Only registered students will be able
                  to take the quiz when it becomes available.
                </p>
                <p>
                  You'll receive a unique Student ID after registration that
                  you'll need to access the quiz.
                </p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="regNumber">Registration Number</label>
              <input
                id="regNumber"
                type="text"
                placeholder="e.g., 12/3456789 or 12/34567890TR or 202440550986FFU"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                disabled={alreadyRegistered}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={alreadyRegistered}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={checkingRegistration || isRegistering}
              />
            </div>

            {alreadyRegistered ? (
              <div className="existing-registration">
                <div className="success-message">
                  ✓ You are already registered
                </div>
                {quizActive ? (
                  <button
                    className="primary-button"
                    onClick={handleProceedWithExisting}
                  >
                    Proceed to Quiz
                  </button>
                ) : (
                  <div className="info-card">
                    <p>
                      Quiz will be available soon. Please wait for further
                      instructions.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <button
                className={`primary-button ${
                  !regNumber.trim() || !fullName.trim() || !email.trim()
                    ? "disabled"
                    : ""
                }`}
                onClick={handleRegistration}
                disabled={
                  isRegistering ||
                  checkingRegistration ||
                  !regNumber.trim() ||
                  !fullName.trim() ||
                  !email.trim()
                }
              >
                {isRegistering
                  ? "Registering..."
                  : checkingRegistration
                  ? "Checking..."
                  : "Register for Test"}
              </button>
            )}
          </div>
        )}

        <div className="footer">
          <p>
            Website by{" "}
            <a
              href="https://www.onyekachi.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kachidegreat
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
