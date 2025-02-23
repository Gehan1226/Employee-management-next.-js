import React, { useState } from "react";
import { departmentSchema } from "@/app/lib/util/schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DepartmentFormValues } from "@/app/types/department-roles";
import { addDepartment } from "@/app/api/department";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEmployeesWithoutManagers } from "@/app/api/employee";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function AddDepartmentModal() {
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      responsibility: "",
      manager: "",
    },
  });

  const { data: employees } = useQuery({
    queryKey: ["departments-without-managers"],
    queryFn: getEmployeesWithoutManagers,
  });

  const mutation = useMutation({
    mutationFn: (data: DepartmentFormValues) => {
      return toast.promise(addDepartment(data), {
        loading: "Creating department...",
        success: <b>Department created successfully!</b>,
        error: <b>Could not save department.</b>,
      });
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: DepartmentFormValues) => {
    mutation.mutate(data);
    handleClose();
  };

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        onClick={handleOpen}
      >
        Add Department
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white rounded-[10px] shadow-lg p-7">
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </button>
          <p className="font-semibold text-lg">Create new department</p>
          <p className="text-sm text-gray-500">
            Create a new department by entering the required details. Click
            &apos;Save&apos; to confirm your changes.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-4 mt-8"
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
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Department Responsibility
              </label>
              <input
                type="text"
                id="responsibility"
                {...register("responsibility")}
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                placeholder="Input department responsibility"
              />
              {errors.responsibility && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.responsibility.message}
                </p>
              )}
            </div>

            <div className="mt-2">
              <FormControl fullWidth error={!!errors.manager}>
                <InputLabel id="combo-box-label">Select Manager</InputLabel>
                <Controller
                  name="manager"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="combo-box-label"
                      {...field}
                      label="Select an Option"
                      id="manager"
                      className="bg-gray-50"
                    >
                      {employees?.map((employee) => (
                        <MenuItem
                          key={employee.id}
                          value={employee.id.toString()}
                        >
                          <p>
                            {employee.firstName} {employee.lastName} -
                            <span className="ml-3">
                              🛠️ {employee.role.name}
                            </span>
                          </p>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.manager && (
                  <FormHelperText>{errors.manager.message}</FormHelperText>
                )}
              </FormControl>
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
        </Box>
      </Modal>
    </div>
  );
}
