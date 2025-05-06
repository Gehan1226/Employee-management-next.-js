import React from 'react'
import TaskTable from "@/components/manager/TaskTable";
import { Card, CardContent } from "@mui/material";

export default function TaskViewPage() {
  return (
    <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-5">
      <CardContent>
        <TaskTable />
      </CardContent>
    </Card>
  );
}
