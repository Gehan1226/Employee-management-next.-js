"use client";
import DateInput from "../DateInput";
import DropDownMenu from "../DropDownMenu";
import CountrySelector from "../CountrySelector";
import Input from "../Input";
import { Card, CardContent } from "../card";
import Image from "next/image";

export default function AddEmployeeForm() {
  return (
    <div className="px-16 py-5 overflow-hidden">
      <Card className="py-5">
        <p className="font-semibold text-2xl text-center">
          Employee Registration
        </p>

        <CardContent>
          <div className="relative">
            <form className="px-20 mt-4">
              <div className="grid md:grid-cols-2 md:gap-6">
                <Input
                  type="text"
                  label="First Name"
                  id="first_name"
                  name="firstName"
                  placeholder="john"
                />
                <Input
                  type="text"
                  label="Last Name"
                  id="last_name"
                  name="lastName"
                  placeholder="doe"
                />
              </div>

              <div className="">
                <Input
                  type="text"
                  label="Email address"
                  id="floating_email"
                  name="email"
                  placeholder="joe@doe.com"
                />
              </div>

              <div className="mb-6 ">
                <Input
                  type="tel"
                  label="Mobile number"
                  id="mobile"
                  name="phoneNumber"
                  placeholder="1234567890"
                />
              </div>

              <div className="mb-6 ">
                <DateInput label="Date of birth" name="dob" />
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

              {/* <CountrySelector name="country" />

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
              </div> */}

              <div className="flex flex-row-reverse mt-6">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
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
