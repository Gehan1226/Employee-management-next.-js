import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
} from "@mui/material";
import { Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { TaskResponse } from "@/types/task";
import Input from "../Input";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { taskSchema } from "@/lib/schema/task";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type UpdateTaskModalProps = {
  taskData: TaskResponse;
};

export default function UpdateTaskModal({
  taskData,
}: Readonly<UpdateTaskModalProps>) {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: taskData?.taskDescription ?? "",
      assignedDateTime: taskData?.assignedDate
        ? dayjs(`${taskData.assignedDate} ${taskData.assignedTime}`)
        : dayjs(),
      dueDateTime: taskData?.dueDate
        ? dayjs(`${taskData.dueDate} ${taskData.dueTime}`)
        : dayjs(),
      status: taskData?.status ?? "",
    },
  });

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
          <Pencil size={18} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white rounded-[10px] shadow-lg p-7">
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          <p className="font-semibold text-lg">Update Task</p>
          <p className="text-sm text-gray-500">
            You can update the task details here. Please make sure to fill in
            all the required fields.
          </p>

          <form
            className="flex flex-col gap-8 px-4 mt-8"
            onSubmit={handleSubmit(() => {})}
          >
            <Input
              type="text"
              label="Task Description"
              id="description"
              error={errors.description?.message}
              {...register("description")}
            />
            <div className="flex gap-4 justify-between">
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
                      className="bg-gray-50 w-full"
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
                      className="bg-gray-50 w-full"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

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

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 w-28 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 shadow-md"
              >
                Update Task
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
