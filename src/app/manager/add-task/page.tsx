import AddTaskPage from "@/components/pages/manager/AddTaskPage";
import { Card, CardContent, Divider } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <div className="px-10 py-1 overflow-hidden">
      <Card className="py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="font-semibold text-sky-600 text-2xl text-center">
          Create a new task for employees
        </p>

        <Divider variant="middle" className="mt-4" />

        <CardContent>
          <AddTaskPage />
        </CardContent>
      </Card>
    </div>
  );
}
