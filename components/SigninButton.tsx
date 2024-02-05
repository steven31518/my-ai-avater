"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function SigninButton() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <p>{`${session.user.firstName} ${session.user.lastName}`}</p>
          <Link
            className="text-sky-500 hover:text-sky-600 transition-colors"
            href={"api/auth/signout"}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Link href={"api/auth/signin"}>
            <Button variant="default"> Sign In</Button>
          </Link>
          <Link href={"/auth/signup"}>
            <Button variant="default"> Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
}
