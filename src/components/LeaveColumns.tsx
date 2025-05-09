import { LeaveResponse } from "@/types/leaves";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<LeaveResponse>[] = [
  {
    accessorKey: "reason",
    header: () => <div className="text-black">📝 Leave Reason</div>,
    cell: ({ row }) => (
      <div className="font-semibold text-slate-600 py-2 text-xs">
        {row.getValue("reason")}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-black">📅 Start Date</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-800 text-xs">
        {row.getValue("startDate")}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: () => <div className="text-black">⏰ End Date</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-800 text-xs">
        {row.getValue("endDate")}
      </div>
    ),
  },
  {
    accessorKey: "appliedOn",
    header: () => <div className="text-black">Applied Date</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-800 text-xs">
        {row.getValue("appliedOn")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-black">⏳ Status</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center bg-green-200 w-16 rounded-md text-xs py-1">
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "leaveType",
    header: () => <div className="text-black">🎯 Leave Type</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center bg-green-200 w-16 rounded-md text-xs py-1">
        {row.getValue("leaveType")}
      </div>
    ),
  },
];
