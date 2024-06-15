import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    // Aquí puedes añadir cualquier lógica adicional que necesites para tu middleware
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
    "/admin",
    "/Admin"
  ]
};
