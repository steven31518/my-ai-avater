export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile","/tasks","/collections"],
};

//"/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"
