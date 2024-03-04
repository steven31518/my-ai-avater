import Link from "next/link";
export default async function Home() {
  // await sendMail({ to: "james31518@hotmail.com", subject: "test", body: "Hello world" });
  return (
    <main className="grid max-h-screen bg-base-200 py-16">
      <div className=" text-center place-self-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">Next OAuth</h1>
          <p className="py-6 text-lg- leading-loose">
            這是一個使用 Next.js 和 NextAuth.js 的範例專案，並且使用TRPC來取得資料。
            登入驗證除了google、discord還包含了credentials，註冊與信箱認證、登入與密碼重設驗證等流程。
          </p>
          <Link
            href="/tasks"
            className="bg-blue-500 border rounded-full hover:bg-blue-400 p-4 "
          >
            馬上開始
          </Link>
        </div>
      </div>
    </main>
  );
}
