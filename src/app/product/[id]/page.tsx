"use client";
import { notFound } from "next/navigation";
import { Product } from "@/types/productTypes";
import { useCarrito } from "@/contexts/CarritoContext"; // Importa el hook de contexto
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoShapesOutline } from "react-icons/io5";
import { FaStoreAlt } from "react-icons/fa";

type SingleProductProps = {
  params: {
    id: string;
  };
};

export default function SingleProductCasePage({ params }: SingleProductProps) {
  const { addToCart, successMessage, clearSuccessMessage } = useCarrito(); // Utiliza el hook de contexto para acceder a addToCart y successMessage
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:3000/api/products/${params.id}`
      );
      if (!res.ok) {
        return notFound();
      }
      const data = await res.json();
      setProduct(data);
    };

    fetchData();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Utiliza la función addToCart del contexto para añadir el producto al carrito
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccessMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  return (
    <div className="w-full md:flex justify-around items-center max-h-screen">
      <div className="flex justify-center items-center md:w-[60%] h-fit object-contain bg-white">
        <img src={product?.image} alt={product?.title} />
      </div>
      <div className="w-full md:w-[40%] flex flex-col justify-between items-center mt-5 md:mt-0 md:p-10">
        <div className="w-full">
          <p className="text-2xl md:text-6xl font-thin text-text1 w-full">
            {product?.title}
          </p>
          <div className="mt-3">
            <span className="text-2xl text-text1 w-full py-3">
              ${product?.price}
            </span>
          </div>
        </div>
        <div className="my-5 w-full font-thin">
          <button className="btn-primary" onClick={handleAddToCart}>
            AGREGAR AL CARRITO
          </button>
        </div>
        <div className="w-full">
          <h2 className="text-text1 py-3">DESCRIPCIÓN</h2>
          <p className="text-text2">{product?.description}</p>
        </div>
        <Link href={"/products"} className="btn-put my-5">
          <FaStoreAlt />
          <p>SEGUIR COMPRANDO</p>
        </Link>
      </div>

      {/* Mensaje de éxito temporal */}
      {successMessage && (
        <div className="bg-green-500 text-white fixed bottom-5 right-5 p-4 rounded-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
}
