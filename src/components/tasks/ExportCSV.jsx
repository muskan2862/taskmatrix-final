"use client";

import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

export default function ExportCSV({ tasks }) {

  function exportCSV() {

    if (!tasks.length) {
      alert("No tasks available.");
      return;
    }

    const headers = [
      "Title",
      "Status",
      "Priority",
      "Due Date",
    ];

    const rows = tasks.map(task => [
      task.title,
      task.status,
      task.priority,
      task.due_date,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    saveAs(blob, "tasks.csv");
  }

  return (
    <Button
      variant="outline"
      onClick={exportCSV}
    >
      Export CSV
    </Button>
  );
}