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
