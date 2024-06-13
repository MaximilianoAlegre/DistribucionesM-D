import { Product } from '@/types/productTypes';
import { NextRequest, NextResponse } from 'next/server';

const getProductsByTitle = async (title: string): Promise<Product[]> => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const allProducts: Product[] = await response.json();
  
      // Normalizar el término de búsqueda a minúsculas
      const searchTermNormalized = title.toLowerCase();
  
      // Normalizar los títulos de los productos a minúsculas y buscar coincidencias
      const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTermNormalized)
      );
  
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  
  
  export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
  
    if (!title) {
      return NextResponse.json({ error: 'Invalid title parameter' }, { status: 400 });
    }
  
    try {
      const products = await getProductsByTitle(title);
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
  }