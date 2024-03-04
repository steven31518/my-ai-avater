import SignInForm from "@/components/SignInForm";
import { Button } from "@/components/ui/button";
import SocialButtonGroup from "@/components/SocialButtonGroup";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already registered with another account"
      : "";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center flex-col pt-6 ">
        <div className="bg-muted p-8 rounded">
          <SignInForm />
          <SocialButtonGroup />
        </div>
        <Link href={"/auth/forgotPassword"}>
          <Button variant={"link"}>Forget Your Password?</Button>
        </Link>
        <p className="text-red-500">{urlError}</p>
      </div>
    </Suspense>
  );
}
