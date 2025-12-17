import React, { useState } from "react";
import toast from "react-hot-toast"; // Changed from react-toastify
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./Registration.css";

interface IDVerificationProps {
  onVerificationSuccess: (userData: {
    fullName: string;
    regNumber: string;
    email: string;
    studentId: string;
  }) => void;
  onBackToRegistration: () => void;
}

const IDVerification: React.FC<IDVerificationProps> = ({
  onVerificationSuccess,
  onBackToRegistration,
}) => {
  const [studentId, setStudentId] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Helper for warnings (since react-hot-toast doesn't have toast.warning)
  const showWarning = (message: string) => {
    toast(message, {
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#000",
      },
    });
  };

  const handleVerify = async () => {
    if (!studentId.trim()) {
      toast.error("Please enter your Student ID");
      return;
    }

    setIsVerifying(true);
    try {
      const q = query(
        collection(db, "registrations"),
        where("studentId", "==", studentId.trim().toUpperCase())
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Invalid Student ID. Please check and try again.");
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      onVerificationSuccess({
        fullName: data.fullName,
        regNumber: data.regNumber,
        email: data.email,
        studentId: data.studentId,
      });

      toast.success("ID verified successfully!");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Error verifying ID. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>NSC 203 Online Test</h1>
          <h2>Student Verification</h2>
        </div>

        <div className="registration-form">
          <p className="form-description">
            Please enter the Student ID you received during registration
          </p>

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              id="studentId"
              type="text"
              placeholder="e.g., AB123"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.toUpperCase())}
              maxLength={5}
            />
            <p className="id-hint">
              Your ID should be 2 letters followed by 3 numbers (e.g., AB123)
            </p>
          </div>

          <button
            className="primary-button"
            onClick={handleVerify}
            disabled={isVerifying || !studentId.trim()}
          >
            {isVerifying ? "Verifying..." : "Verify ID"}
          </button>
          {/* 
          <button
            className="secondary-button"
            onClick={onBackToRegistration}
            style={{ marginTop: "1rem" }}
          >
            Back to Registration
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default IDVerification;
