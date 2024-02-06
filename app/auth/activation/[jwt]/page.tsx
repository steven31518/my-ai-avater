import { serverClient } from "@/app/_trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    jwt: string;
  };
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export default async function ActivationPage({ params }: Props) {
  const result = await serverClient.auth.emailValidation(params.jwt);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-muted rounded-md p-8">
        {result === "userNotExist" ? (
          <p>User does not exist</p>
        ) : result === "alreadyActivated" ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-red-500 text-2xl">
              Your Account already activated
            </p>
            <Link href={"/auth/signin"}>
              <Button variant={"link"}>Sign In now</Button>
            </Link>
          </div>
        ) : result.includes("successfully") ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl text-green-500">{result}</p>
            <Link href={"/auth/signin"}>
              <Button variant={"link"}>Sign In now</Button>
            </Link>
          </div>
        ) : (
          <p>Error activating user</p>
        )}
      </div>
    </div>
  );
}
