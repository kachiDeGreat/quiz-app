import React, { useState } from "react";
import { toast } from "react-toastify";
import { collection, query, where, getDocs, or } from "firebase/firestore";
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
    try {
      // Check if input is email format
      const isEmail = identifier.includes("@");

      const q = query(
        collection(db, "registrations"),
        isEmail
          ? where("email", "==", identifier.trim().toLowerCase())
          : where("regNumber", "==", identifier.trim().toUpperCase())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No record found. Please check your input and try again.");
        setFoundData(null);
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      setFoundData({
        fullName: data.fullName,
        regNumber: data.regNumber,
        email: data.email,
        studentId: data.studentId,
      });

      toast.success("Record found!");
    } catch (error) {
      console.error("Error checking ID:", error);
      toast.error("Error retrieving your information. Please try again.");
      setFoundData(null);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>NSC 203 Online Test</h1>
          <h2>Retrieve Your Student ID</h2>
        </div>

        <div className="registration-form">
          <p className="form-description">
            Enter your registration number or email to retrieve your Student ID{" "}
            <br />
            <strong>TEST STARTS BY 6PM ENDS BY 7:30PM</strong>
          </p>

          <div className="form-group">
            <label htmlFor="identifier">Registration Number or Email</label>
            <input
              id="identifier"
              type="text"
              placeholder="e.g., 12/3456789 or your.email@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isChecking}
            />
          </div>

          <button
            className="primary-button"
            onClick={handleCheckID}
            disabled={isChecking || !identifier.trim()}
          >
            {isChecking ? "Searching..." : "Retrieve ID"}
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
                  <strong>Your Student ID:</strong> {foundData.studentId}
                </p>
                <div className="id-notice">
                  <p>
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
            >
              Back to Registration
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
