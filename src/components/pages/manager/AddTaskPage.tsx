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
import { TaskAssignedEmployee } from "@/types/employee";
import Loading from "@/components/animations/Loading";
import SuccessMessage from "@/components/animations/SuccessMessage";
import ErrorMessage from "@/components/animations/ErrorMessage";

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
    onSuccess: () => {
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
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

   const onCreateNewTask = () => {
     setTaskData(null);
     setAssignedEmployees([]);
     setActiveStep(0);
     setCompleted({});
     mutation.reset();
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

      {mutation.isPending && (
        <div className="flex flex-col items-center mt-10">
          <Loading />
          <p className="font-mono"> Saving Task .....</p>
        </div>
      )}

      {mutation.isSuccess && (
        <SuccessMessage
          message="Task created successfully!"
          className="mt-10"
        />
      )}

      {mutation.isError && (
        <ErrorMessage
          message="Error creating task!"
          error={mutation.error.message}
          className="mt-10"
        />
      )}

      {activeStep === 2 && (
        <div className="flex flex-row-reverse mt-7 ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCreateNewTask}
          >
            create new task
          </button>
        </div>
      )}
    </>
  );
}
