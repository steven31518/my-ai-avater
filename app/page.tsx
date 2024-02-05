import Image from "next/image";
import SigninButton from "@/components/SigninButton";
import { sendMail } from "@/lib/mail";

export default async function Home() {
  // await sendMail({ to: "james31518@hotmail.com", subject: "test", body: "Hello world" });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-3">
      <SigninButton />
    </main>
  );
}
