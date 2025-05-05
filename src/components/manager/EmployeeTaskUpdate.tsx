import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import EmployeeInfoCard from "../EmployeeInfoCard";
import { useUserContext } from "@/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesByDepartment } from "@/api/employee";

type EmployeeTaskUpdateProps = {
  employeeIdList: number[];
  onDeleteEmployee: (employeeId: number) => void;
  onAssignEmployee: (employeeId: number) => void;
};

export default function EmployeeTaskUpdate({
  employeeIdList,
  onDeleteEmployee,
  onAssignEmployee,
}: Readonly<EmployeeTaskUpdateProps>) {
  const { user } = useUserContext();

  const { data: employees } = useQuery({
    queryKey: ["employees-by-department"],
    queryFn: () => getEmployeesByDepartment(user?.employee?.department?.id),
    enabled: !!user?.employee?.department?.id,
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      employeeId: "",
    },
  });

  const onSubmit = (data: { employeeId: string }) => {
    onAssignEmployee(parseInt(data.employeeId));
  };

  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-5 items-center"
      >
        <FormControl fullWidth>
          <InputLabel id="combo-box-label">Select Employee</InputLabel>
          <Controller
            name="employeeId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="combo-box-label"
                id="task-status"
                label="Select status"
                className="bg-gray-50"
              >
                {employees
                  ?.filter(
                    (employee) =>
                      !employeeIdList.some((id) => id === employee.id)
                  )
                  .map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </FormControl>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Assign
        </button>
      </form>

      <div className="flex flex-col gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 mt-7 mb-16">
        <p className="font-semibold px-2">Assigned Employees</p>
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-scroll px-5 py-2">
          {employees
            ?.filter((employee) => employeeIdList.includes(employee.id))
            .map((employee) => (
              <EmployeeInfoCard
                key={employee.id}
                employee={{
                  id: employee.id,
                  firstName: employee.firstName,
                  lastName: employee.lastName,
                  role: employee.role.name,
                }}
                onDeleteEmployee={() => {
                  onDeleteEmployee(employee.id);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
