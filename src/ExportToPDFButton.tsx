import React, { useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";
import toast from "react-hot-toast"; // Changed from react-toastify
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Submission {
  fullName: string;
  regNumber: string;
  email: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: any;
  isAutoSubmitted: boolean;
}

const ExportToPDFButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportToPDF = async () => {
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Generating PDF report...", {
      duration: Infinity,
    });

    try {
      // Fetch all submissions sorted by score (descending)
      const q = query(
        collection(db, "quizSubmissions"),
        orderBy("score", "desc")
      );
      const querySnapshot = await getDocs(q);
      const submissions: Submission[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const percentage = Math.round((data.score / data.totalQuestions) * 100);

        submissions.push({
          fullName: data.fullName,
          regNumber: data.regNumber,
          email: data.email,
          studentId: data.studentId,
          score: data.score,
          totalQuestions: data.totalQuestions,
          percentage,
          submittedAt: data.submittedAt?.toDate() || new Date(),
          isAutoSubmitted: data.isAutoSubmitted || false,
        });
      });

      // Log the simplified data to console
      console.log("NSC 203 Quiz Results Export");
      console.log("=".repeat(50));
      console.log("Rank\tName\tReg Number\tStudent ID\tScore\tAuto Submitted");
      console.log("-".repeat(50));

      submissions.forEach((sub, index) => {
        console.log(
          `${index + 1}\t${sub.fullName}\t${sub.regNumber}\t${sub.studentId}\t${
            sub.score
          }/${sub.totalQuestions}\t${sub.isAutoSubmitted ? "Yes" : "No"}`
        );
      });
      console.log("=".repeat(50));
      console.log(`Total submissions: ${submissions.length}`);

      // Create PDF
      const doc = new jsPDF({
        orientation: "portrait",
      });

      // Add title and metadata
      doc.setFontSize(18);
      doc.text("NSC 203 Quiz Results - Detailed Report", 14, 20);

      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
      doc.text(`Total Submissions: ${submissions.length}`, 14, 34);

      // Prepare table data with only the required columns
      const tableData = submissions.map((sub, index) => [
        index + 1,
        sub.fullName,
        sub.regNumber,
        sub.studentId,
        `${sub.score}/${sub.totalQuestions}`,
        sub.isAutoSubmitted ? "Yes" : "No",
      ]);

      // Add main results table with only the required columns
      autoTable(doc, {
        head: [
          [
            "Rank",
            "Name",
            "Reg Number",
            "Student ID",
            "Score",
            "Auto-Submitted",
          ],
        ],
        body: tableData,
        startY: 40,
        styles: {
          fontSize: 8,
          cellPadding: 3,
          valign: "middle",
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 15, halign: "center" }, // Rank
          1: { cellWidth: 30 }, // Name
          2: { cellWidth: 25 }, // Reg Number
          3: { cellWidth: 20 }, // Student ID
          4: { cellWidth: 20, halign: "center" }, // Score
          5: { cellWidth: 20, halign: "center" }, // Auto-submitted
        },
        didDrawPage: (data) => {
          // Footer
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.text(
            `Page ${data.pageNumber}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: "center" }
          );
        },
      });

      // Save the PDF
      const fileName = `NSC203_Quiz_Results_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);

      // Dismiss loading toast and show success toast
      toast.dismiss(loadingToast);
      toast.success(
        `✅ PDF report generated successfully!\nDownloaded as: ${fileName}`,
        {
          duration: 5000,
          style: {
            background: "#10B981",
            color: "#fff",
            maxWidth: "500px",
          },
        }
      );
    } catch (error) {
      console.error("Error exporting to PDF:", error);

      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error("❌ Failed to generate PDF report", {
        duration: 5000,
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExportToPDF}
      disabled={isLoading}
      style={{
        padding: "12px 24px",
        backgroundColor: isLoading ? "#94a3b8" : "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: isLoading ? "not-allowed" : "pointer",
        margin: "20px 0",
        fontSize: "14px",
        fontWeight: "600",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.backgroundColor = "#2563eb";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }
      }}
    >
      {isLoading ? (
        <>
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderTop: "2px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></span>
          Generating Report...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ marginRight: "4px" }}
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>
          Export Full Results Report
        </>
      )}
    </button>
  );
};

export default ExportToPDFButton;
