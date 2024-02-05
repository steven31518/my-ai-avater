import Link from "next/link";
import SignInForm from "@/components/SignInForm";
import { Button } from "@/components/ui/button";
export default function SignInPage() {
  return (
    <div className="flex items-center justify-center flex-col pt-6">
      <SignInForm />
      <Link href={"auth/forgotPass"}>
        <Button variant={"link"}>Forget Your Password?</Button>
      </Link>
    </div>
  );
}
