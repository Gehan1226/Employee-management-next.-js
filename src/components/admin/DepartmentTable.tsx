"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {  ChevronDown } from "lucide-react";
import { Checkbox } from "../table/checkbox";
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
import { useEffect, useState } from "react";
import { getAllDepartmentsWithPagination } from "@/app/api/department";
import { useDebouncedCallback } from "use-debounce";
import { DepartmentResponse } from "@/app/types/department-roles";


export const columns: ColumnDef<DepartmentResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="-ml-12">Name</div>,
    cell: ({ row }) => (
      <div className="capitalize -ml-12 font-semibold text-indigo-600 py-1">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "manager",
    header: () => <div className="-ml-12">👤 Manager</div>,
    cell: ({ row }) => {
      const manager = row.getValue("manager");

      let firstName = "";
      let lastName = "";

      if (
        manager &&
        typeof manager === "object" &&
        "firstName" in manager &&
        "lastName" in manager
      ) {
        firstName = typeof manager.firstName === "string" ? manager.firstName : "";
        lastName = typeof manager.lastName === "string" ? manager.lastName : "";
      }

      return (
        <div className="capitalize -ml-12 font-semibold text-slate-800">{`${firstName} ${lastName}`}</div>
      );
    },
  },
  {
    accessorKey: "responsibility",
    header: () => <div className="-ml-12">Responsibility</div>,
    cell: ({ row }) => (
      <div className="capitalize -ml-12 font-semibold text-slate-600">
        {row.getValue("responsibility")}
      </div>
    ),
  },
  {
    accessorKey: "employeeCount",
    header: () => <div>Employee Count</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center mx-auto bg-green-200 w-16 rounded-md">
        {row.getValue("employeeCount")}
      </div>
    ),
  },
];

export function DepartmentTable() {
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});


  useEffect(() => {
    async function fetchData() {
      const response = await getAllDepartmentsWithPagination(currentPage, searchTerm);
      if (!response.data) {
        return;
      }
      setDepartments(response.data);
      setTotalPages(response.totalPages ?? 0);
    }
    fetchData();
  }, [currentPage, searchTerm]);

  const table = useReactTable({
    data: departments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value); 
  }, 300);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          className="max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
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
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
