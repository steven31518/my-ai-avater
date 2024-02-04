import Image from "next/image";
import SigninButton from "@/components/SigninButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-3">
      <SigninButton />
    </main>
  );
}
