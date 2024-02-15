"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
export default function SigninButton() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <Link href={"/profile"}>
            <Button variant={"link"}>{`${session.user.name}`}</Button>
          </Link>
          <Button
            variant={"destructive"}
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          >
            Sign Out
          </Button>
          {/* <Link
            className="text-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >signout</Link> */}
        </>
      ) : (
        <>
          <Link href={"/api/auth/signin"}>
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
