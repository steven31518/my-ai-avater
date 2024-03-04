"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoDiscord } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface Props {
  callbackUrl?: string;
}

export default function SocialButtonGroup(props: Props) {
  const router = useRouter();

  async function login(provider: "google" | "discord") {
    try {
      await signIn(provider, {
        callbackUrl: props.callbackUrl ? props.callbackUrl : "/",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Sign In With</p>
      </div>
      <div>
        <Separator className="my-4 bg-foreground" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Button onClick={() => login("google")} type="button">
            <FcGoogle className="me-2" />
            Google
          </Button>
          <Separator orientation="vertical" className="bg-foreground" />
          <Button onClick={() => login("discord")} type="button">
            <IoLogoDiscord className="me-2" />
            Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
