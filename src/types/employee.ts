
type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  district: string;
};

export type EmployeeCreateRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string | Date;
  gender: string;
  departmentId: string;
  roleId: string;
  address: Address;
};

type EmployeeRole = {
  id: number;
  name: string;
}

export type EmployeeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  department: string | null;
  role: EmployeeRole;
  address: Address;
  manager: boolean;
};