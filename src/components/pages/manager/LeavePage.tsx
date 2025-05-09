"use client";
import { getLeavesByDepartmentId } from "@/api/leaves";
import LeaveTable from "@/components/LeaveTable";
import { useUserContext } from "@/context/UserContext";
import { Card, CardContent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function LeavePage() {
  const { user } = useUserContext();

  const { data } = useQuery({
    queryKey: ["leaves-by-department-id"],
    queryFn: () => getLeavesByDepartmentId(user?.employee?.department?.id ?? 0),
    enabled: !!user?.employee?.department?.id,
  });

  console.log("sss", data);

  return (
    <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-5 w-full">
      <CardContent>{data && <LeaveTable leaves={data} />}</CardContent>
    </Card>
  );
}
