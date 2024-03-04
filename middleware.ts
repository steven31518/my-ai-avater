export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile/:path*", "/tasks/:path*"],
};

//"/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"
