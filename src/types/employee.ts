
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
  dob: string;
  gender: string;
  departmentId: string;
  roleId: string;
  address: Address;
};

export type EmployeeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  department: string | null;
  role: any;
  address: Address;
  manager: boolean;
};