"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "../table/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../table/dropdown-menu";
import { Button } from "../table/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table";
import React from "react";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import { getAllTasksWithPagination } from "@/api/task";
import { useDebouncedCallback } from "use-debounce";
import { IconButton, Tooltip } from "@mui/material";
import { TaskResponse } from "@/types/task";

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
      <div className="capitalize font-semibold text-slate-800 text-xs">
        <div className="flex gap-2">
          <div className="bg-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs">
            {row.original.employeeList[0]?.firstName.charAt(0)}
          </div>
          <div className="bg-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs">
            {row.original.employeeList[0]?.firstName.charAt(0)}
          </div>
          <div className="bg-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs">
            {row.original.employeeList[0]?.firstName.charAt(0)}
          </div>
          <div className="flex items-center justify-center font-semibold text-xs">
            3 +
          </div>
        </div>
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
    accessorKey: "actions",
    header: () => <div className="text-black">🛠️ Actions</div>,
    cell: ({ row }) => (
      <div className="flex capitalize text-center text-xs gap-5">
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => console.log("Edit", row.original)}
          >
            <Pencil size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => console.log("Delete", row.original)}
          >
            <Trash size={18} />
          </IconButton>
        </Tooltip>
      </div>
    ),
  },
];

export default function TaskTable() {
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);

  const { data: tasks } = useQuery({
    queryKey: ["tasks-paginated", searchTerm],
    queryFn: () => getAllTasksWithPagination(searchTerm),
  });

  const table = useReactTable({
    data: Array.isArray(tasks) ? tasks : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const onSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by task description..."
          className="max-w-sm focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
          onChange={onSearch}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
