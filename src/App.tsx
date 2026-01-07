import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Quiz from "./Quiz";
import Registration from "./Registration";
import "./App.css";
import IDVerification from "./IDVerification";
import MaintenancePage from "./component/underMaintance/MaintenancePage";
import CheckID from "./checkId/CheckID";
import ExportToPDFButton from "./ExportToPDFButton";
import NewYear from "./newYear/NewYear";
import WeddingBulletin from "./weddingBulletin/WeddingBulletin";

interface UserData {
  fullName: string;
  regNumber: string;
  email: string;
  studentId: string;
}

const AppContent: React.FC = () => {
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<
    "registration" | "id-verification" | "quiz" | "check-id"
  >(quizActive ? "id-verification" : "registration");
  const [userData, setUserData] = useState<UserData | null>(null);
  const location = useLocation();

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

  // If we're on the check-id route, show CheckID component
  // if (location.pathname === "/check-id") {
  //   return (
  //     <div className="checkid-wrapper">
  //       <Link to="/" className="back-button">
  //         ← Back to Main Portal
  //       </Link>
  //       <CheckID />
  //     </div>
  //   );
  // }

  // Otherwise, show the original state-based app
  return (
    <>
      {/* Header */}
      {/* {currentView !== "check-id" && (
        <div className="app-header">
          <div className="header-content">
            <h1 className="app-title">NCS 301 Online Test Portal</h1>
            <div className="header-buttons">
              <Link to="/check-id" className="check-id-button">
                Check My ID Status
              </Link>
            </div>
          </div>
        </div>
      )} */}

      {/* Main content */}
      {/* <div className="app-content">
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
      </div> */}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>

        {/* <MaintenancePage />
        <ExportToPDFButton /> */}
        {/* <NewYear /> */}
        <WeddingBulletin />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            zIndex: 9999,
          }}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              fontSize: "16px",
              padding: "16px 24px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
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
    </Router>
  );
};

export default App;
