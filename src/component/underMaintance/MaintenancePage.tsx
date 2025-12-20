import type React from "react";
import "./maintenance-page.css";

const MaintenancePage: React.FC = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="maintenance-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="maintenance-svg"
          >
            <path
              d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5Z"
              fill="currentColor"
            />
            <path
              d="M10.29 8.44L9.5 6l-.79 2.44H6.25l2.01 1.56-.77 2.5 2.01-1.56 2.01 1.56-.77-2.5 2.01-1.56h-2.46Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1
          className="maintenance-title"
          style={{ textTransform: "uppercase" }}
        >
          NCS 301 is starting soon
        </h1>
        {/* <h1 className="maintenance-title">Registrations Have Ended</h1> */}

        <p className="maintenance-description">
          <span style={{ textTransform: "uppercase", fontWeight: "bolder" }}>
            {" "}
            Test Schedule:
          </span>
          <ul>
            {/* <li>NCS 313: 6:00 PM – 7:30 PM </li> */}
            <li>NCS 301: 9:00 PM – 10:30 PM </li>
          </ul>
          You will use the same ID you received during registration to take both
          tests. If you did not copy or save your ID, you can retrieve it from
          the top-right corner of this page when the test is available.
        </p>

        <div className="maintenance-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-text">Upgrading quiz engine...</p>
        </div>

        <div className="maintenance-contact">
          {/* <a href="https://wa.link/7fu1sh" className="contact-link">
            Contact Support
          </a> */}
          {/* <a
            href="mailto:onyekachi.godswill.richard@gmail.com"
            className="contact-link"
          >
            Contact Support
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
