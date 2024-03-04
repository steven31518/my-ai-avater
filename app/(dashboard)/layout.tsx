import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main className="">
      <div className="">{children}</div>
    </main>
  );
}
export default layout;
