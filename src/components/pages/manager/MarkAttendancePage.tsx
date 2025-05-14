import React from 'react'
import { Card, CardContent } from "@mui/material";

export default function MarkAttendancePage() {
  return (
    <div className="flex gap-5 mt-5 ">
      <Card className="py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full">
        <p className="font-semibold text-lg text-center py-5">Check In</p>
        <CardContent></CardContent>
      </Card>
      <Card className="py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full">
        <p className="font-semibold text-lg text-center py-5">Check Out</p>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
