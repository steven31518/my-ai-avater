import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5">
      <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
    </main>
  );
}
export default layout;
