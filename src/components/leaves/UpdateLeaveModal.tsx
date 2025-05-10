import { LeaveApprovedRequest, LeaveResponse, LeaveStatus } from "@/types/leaves";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { Pencil, X } from "lucide-react";
import React, { useState } from "react";
import DropDownMenu from "../DropDownMenu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaveApprovalSchema } from "@/lib/schema/leave";
import { approveLeave } from "@/api/leaves";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/util/queryClient";
import { useUserContext } from "@/context/UserContext";

type UpdateLeaveModalProps = {
  leave: LeaveResponse;
};

export default function UpdateLeaveModal({
  leave,
}: Readonly<UpdateLeaveModalProps>) {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof leaveApprovalSchema>>({
    resolver: zodResolver(leaveApprovalSchema),
    defaultValues: {
      status: leave.status,
      comment: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LeaveApprovedRequest) => approveLeave(data),
    onSuccess: (response: string) => {
      queryClient.invalidateQueries({ queryKey: ["leaves-by-department-id"] });
      reset();
      setOpen(false);
      toast.success(response);
    },
  });

  const onSubmit = (data: z.infer<typeof leaveApprovalSchema>) => {
    const approvedData: LeaveApprovedRequest = {
      approvedOn: new Date().toISOString(),
      comments: data.comment,
      status: data.status as LeaveStatus,
      leaveRequestId: leave.id,
      approvedBYEmployeeId: user?.employee?.id ?? 0,
    }
    mutation.mutate(approvedData);
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
          <Pencil size={18} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          reset();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-h-[650px] overflow-y-auto bg-white rounded-[10px] shadow-lg p-7">
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          <p className="font-semibold text-lg">Update Leave Staus</p>
          <p className="text-sm text-gray-500">
            You can update the leave status here. You will be recorded as the
            person who made the changes.
          </p>

          <div className="grid grid-cols-6 gap-y-4 px-10 py-7 mt-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <p className="font-semibold text-sm">Reason :-</p>
            <p className="col-span-5 font-semibold text-sm text-gray-500">
              {leave.reason}
            </p>

            <p className="font-semibold text-sm">Start Date :-</p>
            <p className="col-span-5 font-semibold text-sm text-gray-500">
              {leave.startDate}
            </p>

            <p className="font-semibold text-sm">End Date :-</p>
            <p className="col-span-5 font-semibold text-sm text-gray-500">
              {leave.endDate}
            </p>

            <p className="font-semibold text-sm">Applied On :-</p>
            <p className="col-span-5 font-semibold text-sm text-gray-500">
              {leave.appliedOn}
            </p>

            <p className="font-semibold text-sm">Leave Type :-</p>
            <p className="col-span-5 font-semibold text-sm text-gray-500">
              {leave.leaveType.name}
            </p>

            <p className="font-semibold text-sm">Employee :-</p>
            <p className="col-span-5 font-semibold text-sm text-gray-500">
              {leave.employee.firstName} {leave.employee.lastName}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-5 mt-10"
          >
            <DropDownMenu
              label="Status"
              menuItems={[
                { label: "PENDING", id: "PENDING" },
                { label: "APPROVED", id: "APPROVED" },
                { label: "REJECTED", id: "REJECTED" },
              ]}
              name="status"
              control={control}
              error={errors.status?.message}
            />

            <div className="w-full">
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Comment
              </label>
              <textarea
                id="comment"
                {...register("comment")}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your comment..."
              />

              {errors.comment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
