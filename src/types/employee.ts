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

export type EmployeeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  department: {
    id: number;
    name: string;
  };
  role: {
    id: number;
    name: string;
  };
  address: Address;
  manager: boolean;
};
