"use client";
import Image from "next/image";
import { useState } from "react";
import { addressInfoSchema, personalInfoSchema } from "@/lib/schema/employee";
import { Card, CardContent } from "@/components/card";
import AddEmployeeStepper from "@/components/manager/AddEmployeeStepper";
import EmployeePersonalDetailsForm from "@/components/manager/EmployeePersonalDetailsForm";
import EmployeeAddressForm from "@/components/manager/EmployeeAddressForm";
import { CircleCheckBig } from "lucide-react";
import { EmployeeCreateRequest } from "@/types/employee";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllDepartments } from "@/api/department";
import { getRolesByDepartment } from "@/api/role";
import Loading from "@/components/animations/Loading";
import { saveEmployee } from "@/api/employee";

const steps = [
  "Employee Personal Details",
  "Employee Address",
  "Save Employee",
];

export default function AddEmployeePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >();

  const [employeeData, setEmployeeData] = useState<EmployeeCreateRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    departmentId: "",
    roleId: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      district: "",
    },
  });

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
    setEmployeeData((prev) => ({
      ...prev,
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
    }));
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onSubmitAddress = (data: z.infer<typeof addressInfoSchema>) => {
    setEmployeeData((prev) => ({
      ...prev,
      address: data,
    }));
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    mutation.mutate({
      ...employeeData,
      address: data,
    });
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
                defaultValues={employeeData}
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

            {/* {activeStep === 2 && (
              <>
                
                <div className="flex flex-col items-center mt-10">
                  <CircleCheckBig
                    size={48}
                    color="#2f5cb6"
                    strokeWidth={1.75}
                  />
                  <p>Employee added successfully !</p>
                </div>
              </>
            )} */}

            {mutation.isPending && (
              <div className="flex flex-col items-center mt-10">
                <Loading />
              </div>
            )}

            {mutation.isSuccess && (
              <div className="flex flex-col items-center mt-10">
                <CircleCheckBig size={48} color="#2f5cb6" strokeWidth={1.75} />
                <p>Employee added successfully !</p>
              </div>
            )}

            <Image
              src="/employee-img-1.png"
              alt="employee image"
              width={300}
              height={300}
              className="absolute -top-24 -right-44 "
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
