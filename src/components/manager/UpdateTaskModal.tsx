import { Box, Divider, IconButton, Modal, Tooltip } from "@mui/material";
import { Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { TaskResponse, TaskUpdateRequest } from "@/types/task";
import Input from "../Input";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { taskSchema } from "@/lib/schema/task";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/api/task";
import queryClient from "@/lib/util/queryClient";
import EmployeeTaskUpdate from "./EmployeeTaskUpdate";
import { taskStatus } from "@/lib/schema/task-status";
import TabNavigation from "./TabNavigation";
import DropDownMenu from "../DropDownMenu";

type UpdateTaskModalProps = {
  taskData: TaskResponse;
};

export default function UpdateTaskModal({
  taskData,
}: Readonly<UpdateTaskModalProps>) {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState<0 | 1>(0);
  const [employeeIdList, setEmployeeIdList] = useState<number[]>(
    taskData.employeeList.map((emp) => emp.id)
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskUpdateRequest }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks-by-manager"] });
      reset();
      setOpen(false);
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        description: taskData?.taskDescription ?? "",
        assignedDateTime: taskData?.assignedDate
          ? dayjs(`${taskData.assignedDate} ${taskData.assignedTime}`)
          : dayjs(),
        dueDateTime: taskData?.dueDate
          ? dayjs(`${taskData.dueDate} ${taskData.dueTime}`)
          : dayjs(),
        status: taskData?.status ?? "",
      });
      setEmployeeIdList(taskData.employeeList.map((emp) => emp.id));
      setSlide(0);
    }
  }, [open, taskData, reset]);

  const onDeleteEmployee = (employeeId: number) => {
    setEmployeeIdList((prev) => prev.filter((id) => id !== employeeId));
  };

  const onAddEmployee = (employeeId: number) => {
    setEmployeeIdList((prev) => [...prev, employeeId]);
  };

  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    const taskUpdateData: TaskUpdateRequest = {
      taskDescription: data.description,
      assignedDate: data.assignedDateTime.format("YYYY-MM-DD"),
      assignedTime: data.assignedDateTime.format("HH:mm:ss"),
      dueDate: data.dueDateTime.format("YYYY-MM-DD"),
      dueTime: data.dueDateTime.format("HH:mm:ss"),
      status: data.status,
      employeeIdList: employeeIdList,
    };
    mutation.mutate({ id: taskData.id, data: taskUpdateData });
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
          <Pencil size={18} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          reset();
        }}
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

          <TabNavigation
            activeTab={slide}
            onTabChange={(tabIndex) => setSlide(tabIndex)}
          />

          <Divider className="mt-5" />

          <form
            className={`flex flex-col gap-8 px-4 mt-8 ${
              slide === 0 ? "mb-16" : ""
            }`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {slide === 0 && (
              <>
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

                <DropDownMenu
                  label="Select Status"
                  name="status"
                  control={control}
                  menuItems={taskStatus}
                  error={errors.status?.message}
                />
              </>
            )}

            <div className="absolute bottom-3 right-5 flex gap-4 ">
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

          {slide === 1 && (
            <EmployeeTaskUpdate
              employeeIdList={employeeIdList}
              onDeleteEmployee={onDeleteEmployee}
              onAssignEmployee={onAddEmployee}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
