import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  const user = session?.user;

  return (
    <section className="flex flex-col justify-center items-start gap-4">
      <Image
        height={300}
        width={300}
        src={user?.image ?? ""}
        alt={user?.email ?? ""}
        className="rounded-full bg-muted"
      ></Image>
      <h1 className="font-semibold text-xl mb-6">個人檔案</h1>
      <div className="grid grid-cols-4 gap-y-4">
        <p className="col-span-3">{user?.email}</p>
        <p className="col-span-3">{user?.name}</p>
      </div>
    </section>
  );
}
