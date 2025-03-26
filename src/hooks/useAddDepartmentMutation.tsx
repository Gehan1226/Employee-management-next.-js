import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { DepartmentFormValues } from '../types/department-roles';
import toast from 'react-hot-toast';
import { addDepartment } from '../api/department';

export default function useAddDepartmentMutation() {
  return useMutation({
    mutationFn: (data: DepartmentFormValues) => {
      return toast.promise(addDepartment(data), {
        loading: "Creating department...",
        success: <b>Department created successfully!</b>,
        error: (error) => <b>{error.message}</b>,
      });
    },
  });
}
