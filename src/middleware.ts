import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth: middleware } = NextAuth(authConfig);

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];
export default middleware((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isUserLoggedIn: boolean = Boolean(req.auth);

  if (authRoutes.includes(path) && isUserLoggedIn)
    return NextResponse.redirect(new URL("/profile", nextUrl));

  if (protectedRoutes.includes(path) && !isUserLoggedIn)
    return NextResponse.redirect(new URL("/login", nextUrl));
});

export const config = {
  matcher: ["/login", "/register", "/profile"],
};

// import { auth } from "@/auth"; // auth() is a function, not a middleware!
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const session = await auth();

//   console.log("middleware called for:", req.nextUrl.pathname);

//   if (!session) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login"], // أو أي مسارات تحب تحميها
// };
