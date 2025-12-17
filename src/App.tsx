import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast"; // Add toast import
import Quiz from "./Quiz";
import Registration from "./Registration";
import "./App.css";
import IDVerification from "./IDVerification";
import MaintenancePage from "./component/underMaintance/MaintenancePage";
import CheckID from "./checkId/CheckID";
import ExportToPDFButton from "./ExportToPDFButton";

interface UserData {
  fullName: string;
  regNumber: string;
  email: string;
  studentId: string;
}

const App: React.FC = () => {
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<
    "registration" | "id-verification" | "quiz"
  >(quizActive ? "id-verification" : "registration");
  const [userData, setUserData] = useState<UserData | null>(null);

  // Test toast on component mount
  // useEffect(() => {
  //   console.log("App mounted - testing toast...");
  //   toast.success("App loaded successfully!");
  // }, []);

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    setCurrentView(quizActive ? "id-verification" : "registration");
  };

  const handleIDVerificationSuccess = (data: UserData) => {
    setUserData(data);
    setCurrentView("quiz");
  };

  const handleBackToRegistration = () => {
    setCurrentView("registration");
  };

  // Test function
  // const testToast = () => {
  //   toast.success("Test toast is working!");
  //   toast.error("Error test!");
  //   toast.loading("Loading test...");
  //   setTimeout(() => {
  //     toast.dismiss();
  //     toast.success("Loading complete!");
  //   }, 2000);
  // };

  return (
    <div className="app">
      {/* Test button - REMOVE THIS AFTER TESTING */}
      {/* <button
        onClick={testToast}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 10000,
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Test Toast
      </button> */}

      {currentView === "registration" && (
        <Registration
          onRegistrationComplete={handleRegistrationComplete}
          quizActive={quizActive}
          userData={userData}
        />
      )}

      {currentView === "id-verification" && (
        <IDVerification
          onVerificationSuccess={handleIDVerificationSuccess}
          onBackToRegistration={handleBackToRegistration}
        />
      )}

      {currentView === "quiz" && userData && (
        <Quiz
          userData={userData}
          onBackToVerification={() => setCurrentView("id-verification")}
        />
      )}

      {/* <MaintenancePage /> */}
      {/* <ExportToPDFButton /> */}
      {/* <CheckID /> */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          zIndex: 9999,
        }}
        toastOptions={{
          // Default options
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "16px",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            marginTop: "0",
          },
          success: {
            duration: 5000,
            style: {
              background: "#10B981",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
          loading: {
            duration: Infinity,
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
