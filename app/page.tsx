import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-3">
      <Link href={"/tasks"}>
        <Button variant={"default"}>Get Start</Button>
      </Link>
    </main>
  );
}
