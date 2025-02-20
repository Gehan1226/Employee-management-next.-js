import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { departmentSchema } from "@/app/lib/util/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DepartmentFormValues } from "@/app/types/department-roles";
import { addDepartment } from "@/app/api/department";



export default function AddDepartmentModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit = async (data: DepartmentFormValues) => {
    console.log("Form Data:", data);
    const response = await addDepartment(data);
    console.log(response);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        >
          Add Department
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-5/6">
        <DialogHeader>
          <DialogTitle>Create new department</DialogTitle>
          <DialogDescription>
            Create a new department by entering the required details. Click
            &apos;Save&apos; to confirm your changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-4"
          >
            <div>
              <label
                htmlFor="department-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department Name
              </label>
              <input
                type="text"
                id="department-name"
                {...register("name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input department name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="responsibility"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department Responsibility
              </label>
              <input
                type="text"
                id="responsibility"
                {...register("responsibility")}
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input department responsibility"
              />
              {errors.responsibility && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.responsibility.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="manager"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manager
              </label>
              <select
                id="manager"
                {...register("manager")}
                className="rounded-sm w-full bg-gray-50 border border-gray-300 text-gray-900 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="1">Select a manager</option>
                <option value="2">Manager 1</option>
                <option value="3">Manager 2</option>
              </select>
              {errors.manager && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.manager.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 w-28 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
