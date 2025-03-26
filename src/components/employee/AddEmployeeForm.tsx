"use client";
import DateInput from "../DateInput";
import DropDownMenu from "../DropDownMenu";
import CountrySelector from "../CountrySelector";
import Input from "../Input";
import { Card, CardContent } from "../card";
import Image from "next/image";
import AddEmployeeStepper from "../manager/AddEmployeeStepper";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeFormSchema } from "@/lib/schema/employee";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function AddEmployeeForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const {
    register: step1Register,
    formState: { errors: step1Errors },
    handleSubmit: step1HandleSubmit,
    control: step1Control,
  } = useForm({
    resolver: zodResolver(employeeFormSchema.shape.step1),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: undefined,
      gender: undefined,
    },
  });

  const step2Form = useForm({
    resolver: zodResolver(employeeFormSchema.shape.step2),
    mode: "onBlur",
    defaultValues: {
      country: "",
      state: "",
      district: "",
      city: "",
      street: "",
      postalCode: "",
    },
  });

  const handleNext = async () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const onSubmitForm1 = (data: any) => {
    console.log(data);
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

            <form
              className="px-20 mt-10"
              onSubmit={step1HandleSubmit(onSubmitForm1)}
            >
              {activeStep === 0 && (
                <>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <Input
                      type="text"
                      label="First Name"
                      id="first_name"
                      placeholder="john"
                      {...step1Register("firstName")}
                      error={step1Errors.firstName?.message}
                    />
                    <Input
                      type="text"
                      label="Last Name"
                      id="last_name"
                      placeholder="doe"
                      {...step1Register("lastName")}
                      error={step1Errors.lastName?.message}
                    />
                  </div>

                  <div className="">
                    <Input
                      type="text"
                      label="Email address"
                      id="floating_email"
                      placeholder="joe@doe.com"
                      {...step1Register("email")}
                      error={step1Errors.email?.message}
                    />
                  </div>

                  <div className="mb-6 ">
                    <Input
                      type="tel"
                      label="Mobile number"
                      id="mobile"
                      placeholder="1234567890"
                      {...step1Register("phoneNumber")}
                      error={step1Errors.phoneNumber?.message}
                    />
                  </div>

                  <div className="mb-6">
                    <DateInput
                      label="Date of Birth"
                      name="dob"
                      control={step1Control}
                      error={step1Errors.dob?.message}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <DropDownMenu
                      label="Gender"
                      menuItems={[
                        { label: "Male", id: "Male" },
                        { label: "Female", id: "Female" },
                        { label: "Other", id: "Other" },
                      ]}
                      name="gender"
                      control={step1Control}
                      error={step1Errors.gender?.message}
                    />

                    {/* <DropDownMenu
                            label="Department"
                            menuItems={mapDepartmentToDropdownItem(departments)}
                            name='department'
                            handleChange={onSelectDepartment}
                            error={state.validationErrors?.department}
                        />

                        <DropDownMenu
                            label="Role"
                            menuItems={mapRoleToDropdownItem(roles)}
                            name='role'
                            error={state.validationErrors?.role}
                        /> */}
                  </div>

                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <CountrySelector name="country" />

                  <div className="grid md:grid-cols-2 gap-3 mt-6">
                    <Input
                      type="text"
                      label="State"
                      id="floating_state"
                      name="state"
                    />

                    <Input
                      type="text"
                      label="District"
                      id="floating_district"
                      name="district"
                    />

                    <Input
                      type="text"
                      label="City"
                      id="floating_city"
                      name="city"
                    />

                    <Input
                      type="text"
                      label="Street"
                      id="floating_street"
                      name="street"
                    />

                    <Input
                      type="text"
                      label="Postal code"
                      id="floating_postal"
                      name="postalCode"
                    />
                  </div>
                </>
              )}

              <div className="flex flex-row-reverse mt-6">
                {/* {activeStep === 1 && (
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                )} */}

                {activeStep === 0 && (
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>

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
