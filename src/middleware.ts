export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/post-server-action", "/posts-client"],
};
