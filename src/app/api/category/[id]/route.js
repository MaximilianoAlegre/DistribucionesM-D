import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";

export async function GET(request, { params }) {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const categoryUpdated = await prisma.category.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });
  return NextResponse.json(categoryUpdated);
}

export async function DELETE(request, { params }) {
  try {
    const categoryRemoved = await prisma.category.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(categoryRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
