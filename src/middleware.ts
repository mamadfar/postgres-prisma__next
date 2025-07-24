import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  //* redirections
  //* internationalization (i18n)
  //* authentication
  //* logging

  console.log("Middleware is running for /posts", req.method);
  return NextResponse.next();
};

export const config = {
  matcher: "/posts",
};
