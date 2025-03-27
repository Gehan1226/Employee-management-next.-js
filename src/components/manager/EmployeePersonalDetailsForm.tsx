import { employeeFormSchema } from "@/lib/schema/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import DropDownMenu from "../DropDownMenu";
import DateInput from "../DateInput";

import {
  mapDepartmentToDropdownItem,
  mapRoleToDropdownItem,
} from "@/lib/util/map-object";
import { EmployeeCreateRequest } from "@/types/employee";
import { DepartmentResponse, RoleResponse } from "@/types/department-roles";

type EmployeePersonalDetailsFormProps = {
  activeStep: number;
  onFormSubmit: (data: any) => void;
  defaultValues: EmployeeCreateRequest;
  departments: DepartmentResponse[];
  roles: RoleResponse[];
  onSelectDepartment: (departmentId: string) => void;
};

export default function EmployeePersonalDetailsForm({
  activeStep,
  onFormSubmit,
  defaultValues,
  onSelectDepartment,
  departments,
  roles,
}: Readonly<EmployeePersonalDetailsFormProps>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(employeeFormSchema.shape.step1),
    defaultValues: {
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
      email: defaultValues.email,
      phoneNumber: defaultValues.phoneNumber,
      dob: defaultValues.dob,
      gender: defaultValues.gender,
      departmentId: defaultValues.departmentId,
      roleId: defaultValues.roleId,
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

      <div className="mt-5">
        <Input
          type="text"
          label="Email address"
          id="floating_email"
          placeholder="joe@doe.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="mt-5">
        <Input
          type="tel"
          label="Mobile number"
          id="mobile"
          placeholder="1234567890"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />
      </div>

      <div className="mt-5">
        <DateInput
          label="Date of Birth"
          name="dob"
          control={control}
          error={errors.dob?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-5">
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

        <DropDownMenu
          label="Department"
          menuItems={mapDepartmentToDropdownItem(departments ?? [])}
          name="departmentId"
          control={control}
          error={errors.departmentId?.message}
          onChange={onSelectDepartment}
        />

        <DropDownMenu
          label="Role"
          menuItems={mapRoleToDropdownItem(roles ?? [])}
          name="roleId"
          control={control}
          error={errors.roleId?.message}
        />
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="flex flex-row-reverse mt-6">
        {activeStep === 0 && (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
}
