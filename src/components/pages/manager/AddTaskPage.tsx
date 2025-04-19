"use client";
import FormStepper from "@/components/FormStepper";
import React, { useState } from "react";
import EmployeeTaskSelector from "@/components/manager/EmployeeTaskSelector";
import { taskSchema } from "@/lib/schema/task";
import { z } from "zod";
import TaskInfoForm from "@/components/manager/TaskInfoForm";
import { useMutation } from "@tanstack/react-query";
import { TaskCreateRequest } from "@/types/task";
import { saveTask } from "@/api/task";
import toast from "react-hot-toast";
import { TaskAssignedEmployee } from "@/types/employee";

const steps = ["Fill Task Details", "Assign Employees", "Save Task"];

export default function AddTaskPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [taskData, setTaskData] = useState<z.infer<typeof taskSchema> | null>(
    null
  );
  const [assignedEmployees, setAssignedEmployees] = useState<
    TaskAssignedEmployee[]
  >([]);

  const mutation = useMutation({
    mutationFn: (data: TaskCreateRequest) => saveTask(data),
    onSuccess: (data: string) => {
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
      toast.success(data, { position: "top-right" });
    },
  });

  const onSubmitTaskForm = (data: z.infer<typeof taskSchema>) => {
    setTaskData((prev) => ({ ...prev, ...data }));
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const assignEmployee = (employee: TaskAssignedEmployee) => {
    setAssignedEmployees((prev) => [...prev, employee]);
  };

  const unAssignEmployee = (employeeId: number) => {
    setAssignedEmployees((prev) =>
      prev.filter((employee) => employee.id !== employeeId)
    );
  };

  const onSaveTask = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (taskData) {
      const task = {
        taskDescription: taskData?.description,
        assignedDate: taskData?.assignedDateTime.format("YYYY-MM-DD"),
        assignedTime: taskData?.assignedDateTime.format("HH:mm"),
        dueDate: taskData?.dueDateTime.format("YYYY-MM-DD"),
        dueTime: taskData?.dueDateTime.format("HH:mm"),
        status: taskData?.status,
        managerId: 1,
        employeeIdList: assignedEmployees.map((emp) => emp.id),
      };
      mutation.mutate(task);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
        <TaskInfoForm taskData={taskData} onSubmitTaskData={onSubmitTaskForm} />
      )}

      {activeStep === 1 && (
        <div className="flex flex-col gap-8 px-4 mt-12">
          <EmployeeTaskSelector
            assignedEmployees={assignedEmployees}
            assignEmployee={assignEmployee}
            unAssignEmployee={unAssignEmployee}
          />

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleBack}
            >
              back
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 w-28 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
              onClick={onSaveTask}
            >
              Save Task
            </button>
          </div>
        </div>
      )}
    </>
  );
}
