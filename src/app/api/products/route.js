import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  let products;

  if (categoryId) {
    products = await prisma.product.findMany({
      where: {
        categoryId: Number(categoryId),
      },
    });
  } else {
    products = await prisma.product.findMany();
  }

  return NextResponse.json(products);
}

export async function POST(request) {
  const { id, description, image, inStock, price, title, category, categoryId, createdat } = await request.json();
  const newProduct = await prisma.product.create({
    data: {
      id,
      description,
      image,
      inStock,
      price,
      title,
      category,
      categoryId,
      createdat,
    },
  });
  return NextResponse.json(newProduct);
}
