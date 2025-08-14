import React, { useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { toast } from "react-toastify";
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
      // console.log("Rank\tName\tReg Number\tStudent ID\tScore\tAuto Submitted");  
      submissions.forEach((sub, index) => {
        console.log(
          `${index + 1}\t${sub.fullName}\t${sub.regNumber}\t${sub.studentId}\t${
            sub.score
          }/${sub.totalQuestions}\t${sub.isAutoSubmitted ? "Yes" : "No"}`
        );
      });

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
      doc.save(
        `NSC203_Quiz_Results_${new Date().toISOString().split("T")[0]}.pdf`
      );

      toast.success("PDF report generated successfully!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to generate PDF report", {
        position: "top-center",
        theme: "colored",
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
        padding: "10px 20px",
        backgroundColor: isLoading ? "#7f8c8d" : "#2980b9",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "20px 0",
        fontSize: "14px",
        fontWeight: "bold",
        transition: "all 0.3s ease",
      }}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span> Generating Report...
        </>
      ) : (
        "Export Full Results Report"
      )}
    </button>
  );
};

export default ExportToPDFButton;
