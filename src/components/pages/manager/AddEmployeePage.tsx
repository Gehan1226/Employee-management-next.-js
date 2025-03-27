"use client";
import { useState } from "react";
import { addressInfoSchema, personalInfoSchema } from "@/lib/schema/employee";
import { Card, CardContent } from "@/components/card";
import AddEmployeeStepper from "@/components/manager/AddEmployeeStepper";
import EmployeePersonalDetailsForm from "@/components/manager/EmployeePersonalDetailsForm";
import EmployeeAddressForm from "@/components/manager/EmployeeAddressForm";
import { EmployeeCreateRequest } from "@/types/employee";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllDepartments } from "@/api/department";
import { getRolesByDepartment } from "@/api/role";
import Loading from "@/components/animations/Loading";
import { saveEmployee } from "@/api/employee";
import { Employee } from "@/lib/class/employee";
import SuccessMessage from "@/components/animations/SuccessMessage";
import EmployeeImage from "@/components/animations/EmployeeImage";

const steps = [
  "Employee Personal Details",
  "Employee Address",
  "Save Employee",
];

const employee = new Employee();

export default function AddEmployeePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >();

  const { data: departments } = useQuery({
    queryKey: ["all-departments"],
    queryFn: getAllDepartments,
  });

  const { data: roles } = useQuery({
    queryKey: ["roles-by-department", selectedDepartmentId],
    queryFn: () => getRolesByDepartment(selectedDepartmentId),
    enabled: !!selectedDepartmentId,
  });

  const mutation = useMutation({
    mutationFn: (data: EmployeeCreateRequest) => saveEmployee(data),
    onSuccess: () => {
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
      employee.reset();
    },
  });

  const onSelectDepartment = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmitPersonalDetails = (
    data: z.infer<typeof personalInfoSchema>
  ) => {
    employee.setPersonalInfo(data);
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onSubmitAddress = (data: z.infer<typeof addressInfoSchema>) => {
    employee.setAddressInfo(data);
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    mutation.mutate(employee.getEmployeeData());
  };

  return (
    <div className="px-16 py-5 overflow-hidden">
      <Card className="py-5">
        <p className="font-semibold text-2xl text-center">
          Employee Registration
        </p>

        <CardContent>
          <div className="relative">
            <div className="w-3/4 mx-auto mt-10">
              <AddEmployeeStepper
                steps={steps}
                activeStep={activeStep}
                completed={completed}
              />
            </div>

            {activeStep === 0 && (
              <EmployeePersonalDetailsForm
                activeStep={activeStep}
                onFormSubmit={onSubmitPersonalDetails}
                defaultValues={employee.getEmployeeData()}
                departments={departments ?? []}
                roles={roles ?? []}
                onSelectDepartment={onSelectDepartment}
              />
            )}

            {activeStep === 1 && (
              <EmployeeAddressForm
                onFormSubmit={onSubmitAddress}
                handleBack={handleBack}
              />
            )}

            {mutation.isPending && (
              <div className="flex flex-col items-center mt-10">
                <Loading />
                <p className="font-mono"> Saving Employee .....</p>
              </div>
            )}

            {mutation.isSuccess && (
              <SuccessMessage message="Employee added successfully!" />
            )}

            <EmployeeImage value={mutation.isSuccess} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
