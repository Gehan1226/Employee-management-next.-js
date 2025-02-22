export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
  department: string;
  role: string;
  country: string;
  state: string;
  district: string;
  city: string;
  street: string;
  postalCode: string;
};

export type ValidatedEmployee = {
  success: boolean;
  validationErrors?: Employee;
};

export type RegisterEmployeeResponse = {
  success: boolean;
  data: Employee;
  validationErrors: Employee;
  message: string;
  prevData: Record<string, string>;
  backendErrors: string;
};

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  district: string;
  employee: null;
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
  role: {
    id: number;
  };
  address: Address;
  manager: boolean;
};