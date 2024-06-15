import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  }
);

// Configuración del middleware
export const config = {
  matcher: [
    "/products/edit/:path*",
    "/categories/edit/:path*",
    "/auth/register",
    "/newcategory",
    "/new",
  ]
};
