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
import { ChevronDown } from "lucide-react";
import { TaskResponse } from "@/types/response-types";
import { getAllTasksWithPagination } from "@/api/task";

export const columns: ColumnDef<TaskResponse>[] = [
  {
    accessorKey: "taskDescription",
    header: () => <div>Task Description</div>,
    cell: ({ row }) => (
      <div className="font-semibold text-slate-600">
        {row.getValue("taskDescription")}
      </div>
    ),
  },
  {
    accessorKey: "assignedDate",
    header: () => <div>Assign Date</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-800">
        {row.getValue("assignedDate")}
      </div>
    ),
  },
  {
    accessorKey: "assignedTime",
    header: () => <div>Assign Time</div>,
    cell: ({ row }) => (
      <div className="font-semibold text-slate-600">
        {row.getValue("assignedTime")}
      </div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: () => <div>Due Date</div>,
    cell: ({ row }) => (
      <div className="font-semibold text-slate-600">
        {row.getValue("dueDate")}
      </div>
    ),
  },
  {
    accessorKey: "dueTime",
    header: () => <div>Due Time</div>,
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-slate-600">
        {row.getValue("dueTime")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center bg-green-200 w-16 rounded-md">
        {row.getValue("status")}
      </div>
    ),
  },
];

export default function CreatedTasks() {
  const { data: tasks } = useQuery({
    queryKey: ["tasks-paginated"],
    queryFn: getAllTasksWithPagination,
  });

  const table = useReactTable({
    data: Array.isArray(tasks) ? tasks : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          className="max-w-sm"
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
          <Button
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
