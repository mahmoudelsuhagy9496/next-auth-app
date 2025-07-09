import { NextRequest } from "next/server";

import { auth as middleware } from "@/auth";

export default   middleware((req: NextRequest) => {
  console.log("middleware called for : ", req.nextUrl.pathname);
});

export const config = {
  matcher: ["/login"],
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
