import MarkAttendancePage from "@/components/pages/manager/MarkAttendancePage";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="rounded-md border bg-card text-card-foreground shadow">
        <p className="font-semibold text-sky-600 text-2xl text-center py-5">
          Mark your Attendance
        </p>
      </div>

      <MarkAttendancePage />
    </>
  );
}
