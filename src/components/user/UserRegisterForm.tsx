"use client";
import React, { useEffect, useState } from "react";
import AuthInput from "./AuthInput";
import { saveUser } from "../../api/auth";
import LoadingButton from "../LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterFormSchema } from "@/lib/schema/user";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import toast from "react-hot-toast";
import AlertDialogSlide from "../Alert";

export default function UserRegisterForm() {
  const [state, setState] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(userRegisterFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof userRegisterFormSchema>) =>
      saveUser(data),
    onSuccess: (data) => {
      toast.success(data, { position: "top-right" });
    },
  });

  const onFormSubmit = (data: z.infer<typeof userRegisterFormSchema>) => {
    setState(true);
  };

  return (
    <form className="w-full mx-auto p-7" onSubmit={handleSubmit(onFormSubmit)}>
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
          label="Email address"
          id="email"
          type="email"
          placeholder="example@.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="mb-5">
        <AuthInput
          label="Password"
          id="password"
          type="password"
          placeholder="Password (8+ characters)"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <div className="mb-5">
        <AuthInput
          label="Repeat password"
          id="repeat-password"
          type="password"
          placeholder="Password (8+ characters)"
          {...register("repeatPassword")}
          error={errors.repeatPassword?.message}
        />
      </div>

      <div className="flex items-start mb-5 ms-2">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </button>
        </label>
      </div>

      <div className="flex flex-row-reverse">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-10 py-3 text-center"
        >
          Sign up
        </button>

        {/* {isPending && <LoadingButton />} */}
      </div>
      <AlertDialogSlide
        open={state}
        message="User registered successfully!"
        description=" You can now login to your account as a new user. Wait for the admin to
          activate your account and you can start using the platform."
        handleClose={() => setState(false)}
      />
    </form>
  );
}
