import { EmployeeResponse } from "./employee";

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type LeaveType = {
  id: number;
  name: string;
  description?: string;
}
  
export type LeaveResponse = {
  id: number;
  startDate: string; 
  endDate: string; 
  reason: string;
  appliedOn: string; 
  status: LeaveStatus;
  leaveType: LeaveType;
  employee: EmployeeResponse;
};

export type LeaveApprovedRequest = {
  approvedOn: string; 
  comments: string;
  status: LeaveStatus;
  leaveRequestId: number;
  approvedBYEmployeeId: number;
};
