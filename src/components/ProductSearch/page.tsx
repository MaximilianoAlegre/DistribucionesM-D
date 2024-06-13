"use client";
import { useState } from "react";
import { Product } from "@/types/productTypes";

export const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    try {
      console.log(`Buscando productos con el término: ${searchTerm}`);
      const response = await fetch(`/api/search?title=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error al buscar productos");
      }
      const data = await response.json();
      setProducts(Array.from(new Set(data))); // Convertir a un array para evitar duplicados
      setError(""); // Limpiar el error en caso de éxito
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setError("Error al buscar productos");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos..."
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="p-2 border border-gray-300 mt-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex space-x-3 justify-center items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[40px] h-[40px] object-contain"
            />
            <h2>{product.title}</h2>
            <span>${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};