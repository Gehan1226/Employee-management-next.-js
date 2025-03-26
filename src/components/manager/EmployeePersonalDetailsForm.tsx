import { employeeFormSchema } from "@/lib/schema/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import DropDownMenu from "../DropDownMenu";
import DateInput from "../DateInput";
import CountrySelector from "../CountrySelector";

type EmployeePersonalDetailsFormProps = {
  activeStep: number;
  onFormSubmit: (data: any) => void;
};

export default function EmployeePersonalDetailsForm({
  activeStep,
  onFormSubmit,
}: Readonly<EmployeePersonalDetailsFormProps>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
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

  return (
    <form className="px-20 mt-10" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="text"
          label="First Name"
          id="first_name"
          placeholder="john"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          type="text"
          label="Last Name"
          id="last_name"
          placeholder="doe"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <div className="">
        <Input
          type="text"
          label="Email address"
          id="floating_email"
          placeholder="joe@doe.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="mb-6 ">
        <Input
          type="tel"
          label="Mobile number"
          id="mobile"
          placeholder="1234567890"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />
      </div>

      <div className="mb-6">
        <DateInput
          label="Date of Birth"
          name="dob"
          control={control}
          error={errors.dob?.message}
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
          control={control}
          error={errors.gender?.message}
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

      <div className="flex flex-row-reverse mt-6">
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
  );
}
