import React from "react";
import CountrySelector from "../CountrySelector";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeFormSchema } from "@/lib/schema/employee";


type EmployeeAddressFormProps = {
  onFormSubmit: (data: any) => void;
  handleBack: () => void;
};

export default function EmployeeAddressForm({
  onFormSubmit,
  handleBack,
}: Readonly<EmployeeAddressFormProps>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
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

  return (
    <form className="px-20 mt-10" onSubmit={handleSubmit(onFormSubmit)}>
      <CountrySelector
        name="country"
        control={control}
        error={errors.country?.message}
      />

      <div className="grid md:grid-cols-2 gap-y-4 gap-x-5  mt-6">
        <Input
          type="text"
          label="State"
          id="floating_state"
          {...register("state")}
          error={errors.state?.message}
        />

        <Input
          type="text"
          label="District"
          id="floating_district"
          {...register("district")}
          error={errors.district?.message}
        />

        <Input
          type="text"
          label="City"
          id="floating_city"
          {...register("city")}
          error={errors.city?.message}
        />

        <Input
          type="text"
          label="Street"
          id="floating_street"
          {...register("street")}
          error={errors.street?.message}
        />

        <Input
          type="text"
          label="Postal code"
          id="floating_postal"
          {...register("postalCode")}
          error={errors.postalCode?.message}
        />
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="flex justify-between mt-5">
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBack}
        >
          back
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Employee
        </button>
      </div>
    </form>
  );
}
