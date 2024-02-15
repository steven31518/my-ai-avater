import { serverClient } from "@/app/_trpc/server";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { verifyJwt } from "@/lib/jwt";
import Image from "next/image";

interface Props {
  params: {
    jwt: string;
  };
}

export default async function ResetPasswordPage({ params }: Props) {
  const validation = await serverClient.auth.resetPassValidation(params.jwt);
  if (validation === "URLIsNotValid") {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        The URL is not valid!
      </div>
    );
  }
  if (validation === "userNotExist") {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        User Not Exist , Please Sign Up
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
      {validation === "validURL" && (
        <ResetPasswordForm jwtUserId={params.jwt} />
      )}
      <Image
        src="/forgot-password.png"
        alt="forgot password"
        width={500}
        height={500}
      ></Image>
    </div>
  );
}
