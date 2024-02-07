import ResetPasswordForm from "@/components/ResetPasswordForm";
import Image from "next/image";

interface Props {
  params: {
    jwt: string;
  };
}

export default function page({ params }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
      <ResetPasswordForm jwtUserId={params.jwt} />
      <Image
        src="/forgot-password.png"
        alt="forgot password"
        width={500}
        height={500}
      ></Image>
    </div>
  );
}
