import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quiz from "./Quiz";
import Registration from "./Registration";
import "./App.css";
import IDVerification from "./IDVerification";
import MaintenancePage from "./component/underMaintance/MaintenancePage";
import CheckID from "./checkId/CheckID";

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

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    setCurrentView(quizActive ? "id-verification" : "registration");
  };

  const handleIDVerificationSuccess = (data: UserData) => {
    setUserData(data);
    setCurrentView("quiz");
  };

  // const handleBackToVerification = () => {
  //   setCurrentView("id-verification");
  // };

  const handleBackToRegistration = () => {
    setCurrentView("registration");
  };

  return (
    <div className="app">
      {/* {currentView === "registration" && (
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
      )} */}

      {/* <MaintenancePage /> */}

      <CheckID />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
