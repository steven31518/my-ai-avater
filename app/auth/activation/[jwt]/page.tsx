import { serverClient } from "@/app/_trpc/server";

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

  if (!result) {
    return <div>Invalid token</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p>{`${result.email} has activated now`}</p>
    </div>
  );
}
