import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Submission {
  fullName: string;
  regNumber: string;
  score: number;
  totalQuestions: number;
  //   timestamp: any;
}

const ExportToPDFButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportToPDF = async () => {
    setIsLoading(true);
    try {
      // Fetch all submissions from Firestore
      const querySnapshot = await getDocs(collection(db, "quizSubmissions"));
      const submissions: Submission[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        submissions.push({
          fullName: data.fullName,
          regNumber: data.regNumber,
          score: data.score,
          totalQuestions: data.totalQuestions,
          //   timestamp: data.timestamp.toDate().toLocaleString(),
        });
      });

      // Create PDF
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text("RAD 222 Quiz Submissions", 14, 20);

      // Add date and total students
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Total Students: ${submissions.length}`, 14, 38);

      // Prepare data for the table with serial numbers
      const tableData = submissions.map((sub, index) => [
        index + 1, // S/N (Serial Number)
        sub.fullName,
        sub.regNumber,
        `${sub.score}/${sub.totalQuestions}`,
        // sub.timestamp,
      ]);

      // Add table using the imported autoTable function
      autoTable(doc, {
        head: [["S/N", "Full Name", "Reg Number", "Score"]],
        body: tableData,
        startY: 45,
        styles: {
          cellPadding: 5,
          fontSize: 7,
          valign: "middle",
          halign: "left",
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 15 }, // Center align and set width for S/N column
        },
      });

      // Save the PDF
      doc.save("RAD222_Quiz_Results.pdf");

      toast.success("PDF exported successfully!", {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to export PDF", {
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
        backgroundColor: "#2980b9",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "20px 0",
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {isLoading ? "Generating PDF..." : "Export Results to PDF"}
    </button>
  );
};

export default ExportToPDFButton;
