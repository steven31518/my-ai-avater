import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  const user = session?.user;
  return (
    <div>
      <Image
        height={300}
        width={300}
        src={user?.image ?? ""}
        alt={user?.email ?? ""}
        className="rounded-full"
      ></Image>
      <div className="grid grid-cols-4 gap-y-4">
        <p className="col-span-3">Email:{user?.email}</p>
        <p className="col-span-3">Name :{user?.name}</p>
      </div>
    </div>
  );
}
