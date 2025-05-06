import UpdateTaskModal from "@/components/manager/UpdateTaskModal";
import { TaskResponse } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import DeleteTaskModal from "./DeleteTaskModal";
import EmployeeMenu from "./EmployeeMenu";

export const columns: ColumnDef<TaskResponse>[] = [
  {
    accessorKey: "taskDescription",
    header: () => <div className="text-black">📝 Task Description</div>,
    cell: ({ row }) => (
      <div className="font-semibold text-slate-600 py-2 text-xs">
        {row.getValue("taskDescription")}
      </div>
    ),
  },
  {
    accessorKey: "assignedDateTime",
    header: () => <div className="text-black">📅 Assigned Date & Time</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-800 text-xs">
        {row.original.assignedDate} - {row.original.assignedTime}
      </div>
    ),
  },
  {
    accessorKey: "dueDateTime",
    header: () => <div className="text-black">⏰ Due Date & Time</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-800 text-xs">
        {row.original.dueDate} - {row.original.dueTime}
      </div>
    ),
  },
  {
    accessorKey: "employeeList",
    header: () => <div className="text-black">Assigned Employees</div>,
    cell: ({ row }) => (
      <EmployeeMenu employeeList={row.original.employeeList} />
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
    accessorKey: "actions",
    header: () => <div className="text-black">🛠️ Actions</div>,
    cell: ({ row }) => (
      <div className="flex capitalize text-center text-xs gap-5">
        <UpdateTaskModal taskData={row.original} />

        <DeleteTaskModal taskId={row.original.id} />
      </div>
    ),
  },
];
