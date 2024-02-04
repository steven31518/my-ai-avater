import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-3">
      <Link href={"/api/auth/signin"}>
        <Button variant={"default"}>Sign In</Button>
      </Link>
      <Link href={"/auth/signup"}>
        <Button variant={"default"}>Sign Up</Button>
      </Link>
    </main>
  );
}
