// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    // Lógica adicional si es necesario
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Permitir el acceso solo si el usuario está autenticado
        return !!token;
      },
    },
  }
);

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
