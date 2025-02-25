import { Box, FormControl, MenuItem, Modal, Select } from "@mui/material";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { TaskFormValues } from "@/app/types/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/lib/util/schemas";

export default function AddTaskModal() {
  const [open, setOpen] = useState<boolean>(false);
  
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: "",
      assignedDateTime: dayjs(),
      dueDateTime: dayjs(),
      status: "",
    },
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: TaskFormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        onClick={handleOpen}
      >
        Add Task
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
          <p className="font-semibold text-lg">Create new task</p>
          <p className="text-sm text-gray-500">
            Create a new task by entering the required details. Click
            &apos;Save&apos; to confirm your changes.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-4 mt-8"
          >
            <div>
              <label
                htmlFor="responsibility"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Task Description
              </label>
              <textarea
                id="message"
                {...register("description")}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter task description..."
              ></textarea>

              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="assignedDateTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    label="Assigned date and time"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        error: !!errors.assignedDateTime,
                        helperText: errors.assignedDateTime?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dueDateTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    label="Due date and time"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        error: !!errors.dueDateTime,
                        helperText: errors.dueDateTime?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            {/* <div className="mt-2">
              <FormControl fullWidth>
                <InputLabel id="combo-box-label">Select Manager</InputLabel>
                <Controller
                  name="manager"
                  render={({ field }) => (
                    <Select
                      labelId="combo-box-label"
                      {...field}
                      label="Select an Option"
                      id="manager"
                      className="bg-gray-50"
                    >
                    
                    </Select>
                  )}
                />
              </FormControl>
            </div> */}

            <Select
              labelId="combo-box-label"
              label="Select status"
              id="manager"
              className="bg-gray-50"
            >
              <MenuItem key="1" value="hello">
                Hello
              </MenuItem>
            </Select>

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
