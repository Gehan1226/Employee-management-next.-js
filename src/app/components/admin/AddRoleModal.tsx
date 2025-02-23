import React, { useState } from "react";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "@/app/lib/util/schemas";
import { RoleFormValues } from "@/app/types/department-roles";
import { getAllDepartments } from "@/app/api/department";
import { useQuery } from "@tanstack/react-query";

export default function AddRoleModal() {
  const [open, setOpen] = useState<boolean>(false);

  const {data: departments} = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      department: "",
    },
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: RoleFormValues) => {
    // mutation.mutate(data);
    handleClose();
  };

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        onClick={handleOpen}
      >
        Add Role
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
          <p className="font-semibold text-lg">Create new role</p>
          <p className="text-sm text-gray-500">
            Create a new role by entering the required details. Click
            &apos;Save&apos; to confirm your changes.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-4 mt-8"
          >
            <div>
              <label
                htmlFor="role-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role Name
              </label>
              <input
                type="text"
                {...register("name")}
                id="role-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input role name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role Description
              </label>
              <input
                type="text"
                {...register("description")}
                id="description"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                placeholder="Input role description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mt-2">
              <FormControl fullWidth error={!!errors.department}>
                <InputLabel id="combo-box-label">Select Department</InputLabel>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="combo-box-label"
                      {...field}
                      label="Select an Option"
                      id="department"
                      className="bg-gray-50"
                    >
                      {departments?.map((department) => (
                        <MenuItem
                          key={department.id}
                          value={department.id.toString()}
                        >
                          <p>
                            {department.name} -
                            <span className="ml-3">
                              ({department.manager.firstName}{" "}
                              {department.manager.lastName})
                            </span>
                          </p>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.department && (
                  <FormHelperText>{errors.department.message}</FormHelperText>
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
