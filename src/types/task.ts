import { Dayjs } from "dayjs";

export type TaskCreateRequest = {
  description: string;
  assignedDateTime: Dayjs;
  dueDateTime: Dayjs;
  status: string;
  employeeList: number[];
};
