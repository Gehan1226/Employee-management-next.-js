import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/schema/task";
import { z } from "zod";
import { taskStatus } from "@/lib/schema/task-status";
import DropDownMenu from "../DropDownMenu";

type TaskInfoFormProps = {
  taskData: z.infer<typeof taskSchema> | null;
  onSubmitTaskData: (data: z.infer<typeof taskSchema>) => void;
};

export default function TaskInfoForm({
  taskData,
  onSubmitTaskData,
}: Readonly<TaskInfoFormProps>) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: taskData?.description ?? "",
      assignedDateTime: taskData?.assignedDateTime ?? dayjs(),
      dueDateTime: taskData?.dueDateTime ?? dayjs(),
      status: taskData?.status ?? "",
    },
  });

  return (
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
          defaultValue={taskData?.description}
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

      <DropDownMenu
        label="Select Status"
        name="status"
        control={control}
        menuItems={taskStatus}
        error={errors.status?.message}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-blue-700 w-28 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        >
          Next
        </button>
      </div>
    </form>
  );
}
