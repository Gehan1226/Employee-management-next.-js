import { useMutation } from "@tanstack/react-query";
import { RoleFormValues } from "../types/department-roles";
import toast from "react-hot-toast";
import { addRole } from "../api/role";

export const useAddRoleMutation = () => {
  return useMutation({
    mutationFn: (data: RoleFormValues) =>
      toast.promise(addRole(data), {
        loading: "Creating role...",
        success: <b>Role created successfully!</b>,
        error: (err) => <b>{err.message}</b>,
      }),
  });
};