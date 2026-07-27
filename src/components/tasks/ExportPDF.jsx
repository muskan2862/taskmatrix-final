"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

export default function ExportPDF({ tasks }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("TaskMatrix - Task Report", 14, 20);

    // Date
    doc.setFontSize(11);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      14,
      30
    );

    const tableData = tasks.map((task) => [
      task.title,
      task.projects?.name || "No Project",
      task.status,
      task.priority,
      task.due_date || "-",
    ]);

    autoTable(doc, {
      startY: 40,
      head: [
        [
          "Task",
          "Project",
          "Status",
          "Priority",
          "Due Date",
        ],
      ],
      body: tableData,
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    doc.save("TaskMatrix-Tasks.pdf");
  };

  return (
    <Button onClick={generatePDF}>
      Export PDF
    </Button>
  );
}