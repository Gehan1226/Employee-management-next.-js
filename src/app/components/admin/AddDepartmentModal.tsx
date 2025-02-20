import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

export default function AddDepartmentModal() {
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
          <form action="" className="flex flex-col gap-5 px-4">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input department name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department Responsiblity
              </label>
              <input
                type="text"
                id="responsiblity"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input department responsibility"
              />
            </div>

            <div>
              <label
                htmlFor="manager"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manager
              </label>
              <select
                name=""
                id="manager"
                className="rounded-sm w-full bg-gray-50"
              >
                <option value="1" defaultChecked>
                  Select a manager
                </option>
                <option value="2">2</option>
              </select>
            </div>
          </form>
        </div>
        <DialogFooter>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
