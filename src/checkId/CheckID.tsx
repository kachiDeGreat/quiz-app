import React, { useState } from "react";
import toast from "react-hot-toast";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../Registration.css"; // Reusing the same styles
import { db } from "../firebaseConfig";

interface CheckIDProps {
  onBackToRegistration?: () => void;
}

const CheckID: React.FC<CheckIDProps> = ({ onBackToRegistration }) => {
  const [identifier, setIdentifier] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [foundData, setFoundData] = useState<{
    fullName: string;
    regNumber: string;
    email: string;
    studentId: string;
  } | null>(null);

  const handleCheckID = async () => {
    if (!identifier.trim()) {
      toast.error("Please enter your registration number or email");
      return;
    }

    setIsChecking(true);
    setFoundData(null); // Clear previous results

    try {
      // Check if input is email format
      const isEmail = identifier.includes("@");
      const searchValue = identifier.trim();

      const q = query(
        collection(db, "registrations"),
        isEmail
          ? where("email", "==", searchValue.toLowerCase())
          : where("regNumber", "==", searchValue.toUpperCase())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error(
          `No record found for "${searchValue}". Please check your input and try again.`
        );
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      const resultData = {
        fullName: data.fullName || "Not provided",
        regNumber: data.regNumber || "Not provided",
        email: data.email || "Not provided",
        studentId: data.studentId || "Not generated",
      };

      setFoundData(resultData);

      // Show success toast
      toast.success(`Student record found for ${resultData.fullName}!`);
    } catch (error: any) {
      console.error("Error checking ID:", error);

      let errorMessage = "Error retrieving your information. Please try again.";

      // More specific error messages based on error type
      if (error.code === "permission-denied") {
        errorMessage = "Access denied. Please contact administrator.";
      } else if (error.code === "unavailable") {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message.includes("quota")) {
        errorMessage =
          "Service temporarily unavailable. Please try again later.";
      }

      toast.error(errorMessage);
    } finally {
      setIsChecking(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isChecking && identifier.trim()) {
      handleCheckID();
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>NCS 313 / 301 Online Test</h1>
          <h2>Retrieve Your Student ID</h2>
        </div>

        <div className="registration-form">
          <p className="form-description">
            Enter your registration number or email to retrieve your Student ID{" "}
            <br />
            <strong>TEST STARTS FROM 6PM ENDS BY 9:30PM 20TH/DEC/2025</strong>
          </p>

          <div className="form-group">
            <label htmlFor="identifier">Registration Number or Email</label>
            <input
              id="identifier"
              type="text"
              placeholder="e.g., 12/3456789 or your.email@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isChecking}
              autoFocus
            />
            <small className="input-hint">
              Enter the exact registration number or email you used during
              registration
            </small>
          </div>

          <button
            className="primary-button"
            onClick={handleCheckID}
            disabled={isChecking || !identifier.trim()}
            style={{ opacity: isChecking ? 0.7 : 1 }}
          >
            {isChecking ? (
              <>
                <span className="spinner" style={{ marginRight: "8px" }}>
                  ⏳
                </span>
                Searching...
              </>
            ) : (
              "Retrieve ID"
            )}
          </button>

          {foundData && (
            <div className="success-card" style={{ marginTop: "20px" }}>
              <div className="success-icon">✓</div>
              <h3>Your Student Record</h3>
              <div className="user-details">
                <p>
                  <strong>Student:</strong> {foundData.fullName}
                </p>
                <p>
                  <strong>Registration Number:</strong> {foundData.regNumber}
                </p>
                <p>
                  <strong>Email:</strong> {foundData.email}
                </p>
                <p>
                  <strong>Your Student ID:</strong>
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "10px",
                      padding: "4px 12px",
                      backgroundColor: "#10B98120",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      color: "#10B981",
                    }}
                  >
                    {foundData.studentId}
                  </span>
                </p>
                <div className="id-notice">
                  <p style={{ color: "#EF4444" }}>
                    ⚠️ Please save this ID - you'll need it to access the quiz
                  </p>
                </div>
              </div>
            </div>
          )}

          {onBackToRegistration && (
            <button
              className="secondary-button"
              onClick={onBackToRegistration}
              style={{ marginTop: "1rem" }}
              disabled={isChecking}
            >
              Back to Registration
            </button>
          )}

          {/* Clear results button */}
          {foundData && (
            <button
              className="secondary-button"
              onClick={() => {
                setFoundData(null);
                setIdentifier("");
              }}
              style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
            >
              Clear & Search Again
            </button>
          )}
        </div>

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

export default CheckID;
