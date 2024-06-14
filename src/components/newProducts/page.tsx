"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useCarrito } from '@/contexts/CarritoContext'; // Importa el hook de contexto


interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  categoryId: number;
  createdat: Date; // Cambiar a string si es necesario
}

export function NewProducts(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { addToCart } = useCarrito(); // Utiliza el hook de contexto para acceder a addToCart
  


  // Obtener la lista de productos desde la base de datos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener los productos");
      }
    };
    fetchProducts();
  }, []);

  // Filtrar los productos ingresados en el último mes
  const getLastMonthProducts = () => {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    const lastMonthDateString = lastMonthDate.toISOString();

    const filteredProducts = products.filter((product) => {
      const productDate = new Date(product.createdat);
      return productDate > lastMonthDate;
    });

    return filteredProducts;
  };

  const lastMonthProducts = getLastMonthProducts();

  // Añade al carrito
  const onAddProduct = (product: Product) => {
    addToCart(product); // Utiliza la función addToCart del contexto para añadir el producto al carrito
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-4 text-text1">
          Novedades
        </h1>

        {/* Lista de productos del último mes */}
        <ul className="flex flex-wrap justify-center items-stretch gap-2 md:gap-5">
          {lastMonthProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden fade-in w-[180px] md:w-[280px] h-[270px] md:h-[450px] flex flex-col justify-between bg-gris"
            >
              <Link href={`/product/${product.id}`}>
                {/* Actualizamos el enlace para dirigir al usuario a la nueva página */}
                <div className="flex justify-center bg-white overflow-hidden items-center w-full h-[130px] md:h-[270px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full"
                  />
                </div>
              </Link>

              <div className="w-full md:h-[180px] flex flex-col justify-between">
                <div className="p-4 flex flex-col">
                  <Link href={`/product/${product.id}`}>
                    {/* Actualizamos el enlace para dirigir al usuario a la nueva página */}
                    <p className="hover:text-blue-600">{product.title}</p>
                  </Link>
                  <span className="font-bold">${product.price}</span>
                </div>

                <div className="flex w-full justify-between">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex justify-center items-center space-x-1 border-b-2 border-celeste p-2 w-full hover:bg-gris1"
                  >
                    <IoEyeOutline />
                    <p className="text-xs hidden md:block">DETALLES</p>
                  </Link>
                  {/* Divisor */}
                  <div className="w-1 h-full bg-celeste"/>

                  <button
                    onClick={() => onAddProduct(product)}
                    className="flex justify-center items-center space-x-1 border-b-2 border-celeste p-2 w-full hover:bg-gris1"
                  >
                    <IoCartOutline />
                    <p className="text-xs hidden md:block">COMPRAR</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>

        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    </div>
  );
}
