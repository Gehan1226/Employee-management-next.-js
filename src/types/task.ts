export type TaskCreateRequest = {
  taskDescription: string;
  assignedDate: string;
  assignedTime: string;
  dueDate: string;
  dueTime: string;
  status: string;
  managerId: number;
  employeeIdList: number[];
};

export type TaskUpdateRequest = {
  taskDescription: string;
  assignedDate: string;
  assignedTime: string;
  dueDate: string;
  dueTime: string;
  status: string;
  employeeIdList: number[];
};

export type TaskEmployeeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
};

export type TaskResponse = {
  id: number;
  taskDescription: string;
  assignedDate: string;
  assignedTime: string;
  dueDate: string;
  dueTime: string;
  status: string;
  employeeList: TaskEmployeeResponse[];
};

export type PaginatedTaskResponse = {
  data: TaskResponse[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  message: string;
  status: string;
};
