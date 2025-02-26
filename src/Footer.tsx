import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>
        Website by{" "}
        <a
          style={{ fontWeight: "bold" }}
          href="https://wa.link/nxg54p"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kachidegreat
        </a>
      </p>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#f8f9fa",
  borderTop: "1px solid #e9ecef",
  marginTop: "auto",
};

export default Footer;
