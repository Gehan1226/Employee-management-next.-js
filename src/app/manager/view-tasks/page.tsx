import TaskTable from "@/components/manager/TaskTable";
import { Card, CardContent } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="rounded-md border bg-card text-card-foreground shadow">
        <p className="font-semibold text-sky-600 text-2xl text-center py-5">
          Created Task List
        </p>
      </div>

      <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-5">
        <CardContent>
          <TaskTable />
        </CardContent>
      </Card>
    </>
  );
}
