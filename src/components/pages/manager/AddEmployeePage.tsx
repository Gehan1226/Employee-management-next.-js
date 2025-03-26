"use client";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeFormSchema } from "@/lib/schema/employee";
import { Card, CardContent } from "@/components/card";
import AddEmployeeStepper from "@/components/manager/AddEmployeeStepper";
import EmployeePersonalDetailsForm from "@/components/manager/EmployeePersonalDetailsForm";
import EmployeeAddressForm from "@/components/manager/EmployeeAddressForm";
import { CircleCheckBig } from "lucide-react";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function AddEmployeePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [data, setData] = useState();
  const [address, setAddress] = useState();

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const onSubmitPersonalDetails = (data: any) => {
    setData(data);
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onSubmitAddress = (data: any) => {
    setAddress(data);
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                handleStep={handleStep}
              />
            </div>

            {activeStep === 0 && (
              <EmployeePersonalDetailsForm
                activeStep={activeStep}
                onFormSubmit={onSubmitPersonalDetails}
              />
            )}

            {activeStep === 1 && (
              <EmployeeAddressForm onFormSubmit={onSubmitAddress} />
            )}

            {activeStep === 2 && (
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
