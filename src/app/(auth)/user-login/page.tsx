import GoogleLogin from "@/components/GoogleLogin";
import UserLoginForm from "@/components/user/UserLoginForm";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col-reverse md:flex-row sm:flex-col-reverse h-fit w-full">
      <div className="basis-3/5 h-screen bg-white border border-white rounded-t-[20px] md:rounded-r-[50px] md:rounded-tl-none shadow-[0px_0px_37px_-1px_rgba(0,_0,_0,_0.7)] justify-between">
        <p className="font-semibold text-sky-600 text-3xl text-center mt-5 mb-10">
          Sign in to Emplytic
        </p>

        <div>
          <GoogleLogin />

          <Divider variant="middle" className="mt-10 mb-5">or</Divider>

          <UserLoginForm />
        </div>

        <div></div>
        <div></div>
      </div>

      <div className="flex flex-col items-center gap-10 mx-auto">
        <div className="text-center mt-5">
          <p className="font-sans text-white text-3xl">
            Welcome to the <span className="font-semibold">&nbsp;Emplytic</span>
          </p>
          <p className="font-sans text-white text-md">
            <i> Empowering teams, streamlining success.</i>
          </p>
        </div>

        <Image
          className="shadow-2xl"
          src="/logo.png"
          width={300}
          height={300}
          alt="Company logo"
        />

        <Link href="/user-reg">
          <button
            type="button"
            className="text-white bg-sky-700 hover:bg-sky-800 border-2 border-white rounded-3xl text-md font-semibold px-20 py-3 text-center mb-10"
          >
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  );
}
