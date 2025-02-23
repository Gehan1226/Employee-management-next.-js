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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};
export default function AddDepartmentModal() {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
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
    queryKey: ["departments"],
    queryFn: getEmployeesWithoutManagers,
  });

  const mutation = useMutation({
    mutationFn: (data: DepartmentFormValues) => {
      return toast.promise(addDepartment(data), {
        loading: "Creating department...",
        success: <b>Department created successfully!</b>,
        error: <b>Could not save department.</b>,
      });
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
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
                      autoWidth
                      id="manager"
                      className="bg-gray-50"
                    >
                      {employees?.map((employee) => (
                        <MenuItem
                          key={employee.id}
                          value={employee.id.toString()}
                        >
                          <p>
                            {employee.firstName} {employee.lastName}{" "}
                            <span className="text-right">🧑‍💼 employee</span>
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
