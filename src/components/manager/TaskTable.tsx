"use client";

import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "../table/input";
import { Button } from "../table/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table";
import React, { useState } from "react";
import { getAllTasksWithPagination } from "@/api/task";
import { useDebouncedCallback } from "use-debounce";
import { columns } from "./task-columns";
import { useUserContext } from "@/context/UserContext";

export default function TaskTable() {
  const { manager } = useUserContext();
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
  const [page, setPage] = useState(0);

  const { data: tasks } = useQuery({
    queryKey: ["tasks-by-manager", manager?.id, searchTerm, page],
    queryFn: () =>
      getAllTasksWithPagination(manager?.id ?? 0, searchTerm, page),
    enabled: !!manager,
  });

  const table = useReactTable({
    data: Array.isArray(tasks?.data) ? tasks.data : [],
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
          {tasks?.totalPages && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === tasks?.totalPages - 1}
              >
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
