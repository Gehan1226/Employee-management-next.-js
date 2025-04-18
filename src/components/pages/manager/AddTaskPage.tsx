"use client";
import FormStepper from "@/components/FormStepper";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/util/schemas";
import { TaskFormValues } from "@/types/schema-types";
import EmployeeTaskSelector from "@/components/manager/EmployeeTaskSelector";

const steps = ["Fill Task Details", "Assign Employees", "Save Task"];

export default function AddTaskPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [taskData, setTaskData] = useState(null);

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

  const onSubmitTaskData = (data: TaskFormValues) => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <div className="w-3/4 mx-auto mt-10">
        <FormStepper
          steps={steps}
          activeStep={activeStep}
          completed={completed}
        />
      </div>

      {activeStep === 0 && (
        <form
          onSubmit={handleSubmit(onSubmitTaskData)}
          className="flex flex-col gap-8 px-4 mt-8"
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
                  className="bg-gray-50"
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
                  className="bg-gray-50"
                />
              )}
            />
          </LocalizationProvider>

          <FormControl fullWidth error={!!errors.status}>
            <InputLabel id="combo-box-label">Select Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="combo-box-label"
                  label="Select status"
                  id="task-status"
                  {...field}
                  className="bg-gray-50"
                >
                  <MenuItem key="1" value="pending">
                    Pending / Assigned
                  </MenuItem>
                  <MenuItem key="2" value="in-progress">
                    In Progress
                  </MenuItem>
                  <MenuItem key="3" value="on-hold">
                    On Hold
                  </MenuItem>
                  <MenuItem key="4" value="completed">
                    Completed
                  </MenuItem>
                  <MenuItem key="5" value="approved">
                    Approved
                  </MenuItem>
                  <MenuItem key="6" value="rejected">
                    Rejected / Rework Required
                  </MenuItem>
                  <MenuItem key="7" value="canceled">
                    Canceled
                  </MenuItem>
                  <MenuItem key="8" value="not-started">
                    Not Started
                  </MenuItem>
                  <MenuItem key="9" value="under-review">
                    Under Review
                  </MenuItem>
                  <MenuItem key="10" value="escalated">
                    Escalated
                  </MenuItem>
                  <MenuItem key="11" value="blocked">
                    Blocked
                  </MenuItem>
                  <MenuItem key="12" value="deferred">
                    Deferred
                  </MenuItem>
                  <MenuItem key="13" value="auto-closed">
                    Auto-Closed
                  </MenuItem>
                </Select>
              )}
            />
            {errors.status && (
              <FormHelperText>{errors.status.message}</FormHelperText>
            )}
          </FormControl>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 w-28 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {activeStep === 1 && (
        <div className="flex flex-col gap-8 px-4 mt-12">
          <EmployeeTaskSelector />

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 w-28 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
            >
              Save Task
            </button>
          </div>
        </div>
      )}
    </>
  );
}
