import SignInForm from "@/components/SignInForm";
import { Button } from "@/components/ui/button";
import SocialButtonGroup from "@/components/SocialButtonGroup";
import Link from "next/link";

import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid pt-6">
        <div className="bg-muted p-8 rounded place-self-center max-w-sm">
          <SignInForm />
          <SocialButtonGroup />
        </div>
        <Link href={"/auth/forgotPassword"} className="place-self-center">
          <Button variant={"link"}>Forget Your Password?</Button>
        </Link>
      </div>
    </Suspense>
  );
}
