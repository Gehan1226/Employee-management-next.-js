"use client";
import React, { useState } from "react";
import AuthInput from "./AuthInput";
import LoadingButton from "../LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginFormSchema } from "@/lib/schema/user";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/api/auth";
import AlertDialogSlide from "../Alert";

export default function UserLoginForm() {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(userLoginFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof userLoginFormSchema>) => userLogin(data),
    onSuccess: (data) => {
      setOpenSuccessAlert(true);
    },
    onError: (error) => {
      setOpenErrorAlert(true);
    },
  });

  const onSubmit = async (data: z.infer<typeof userLoginFormSchema>) => {
    mutation.mutate(data);
  };

  const handleCloseSuccessAlert = () => {
    setOpenSuccessAlert(false);
    mutation.reset();
  };

  const handleCloseErrorAlert = () => {
    setOpenErrorAlert(false);
  };

  return (
    <form className="w-full p-7" onSubmit={handleSubmit(onSubmit)}>
      <div className="px-10 py-10 rounded-xl border bg-card text-card-foreground shadow">
        <div className="mb-5">
          <AuthInput
            label="User name"
            id="user-name"
            type="text"
            placeholder="john"
            {...register("userName")}
            error={errors.userName?.message}
          />
        </div>

        <div className="mb-5">
          <AuthInput
            label="Password"
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <button
            type="button"
            className="text-sm font-semibold text-sky-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </button>
        </div>

        <div className="flex justify-center mt-5">
          {!mutation.isPending ? (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-20 py-3 text-center"
            >
              Sign in
            </button>
          ) : (
            <LoadingButton />
          )}
        </div>
      </div>

      <AlertDialogSlide
        state="SUCCESS"
        open={openSuccessAlert}
        message="User login successfully!"
        successDescription=" You can now go to account selection page and select your account. Wait for the admin to
                activate your account and you can start using the platform."
        handleClose={handleCloseSuccessAlert}
      />

      <AlertDialogSlide
        state="ERROR"
        open={openErrorAlert}
        message="User login failed!"
        errorDescription={mutation.error?.message}
        handleClose={handleCloseErrorAlert}
      />
    </form>
  );
}
