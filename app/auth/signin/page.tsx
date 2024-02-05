import Link from "next/link";
import SignInForm from "@/components/SignInForm";
export default function SignInPage() {
  return (
    <div className="flex items-center justify-center flex-col pt-6">
      <SignInForm />
      <Link href={"auth/forgotPass"}>Forget Your Password</Link> 
    </div>
  );
}
