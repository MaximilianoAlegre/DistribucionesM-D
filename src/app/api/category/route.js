import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories); // Aquí se devuelve la lista de categorías
}

export async function POST(request) {
  const { name } = await request.json(); // No es necesario obtener el id del cuerpo de la solicitud, ya que Prisma generará automáticamente el id.
  const newCategory = await prisma.category.create({
    data: {
      name, // Solo necesitas especificar el nombre de la categoría
    },
  });
  return NextResponse.json(newCategory);
}
