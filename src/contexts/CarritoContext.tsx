"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/productTypes"; // Ajusta la ruta según sea necesario

interface CarritoContextType {
  allProducts: Product[];
  total: number;
  countProducts: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  decreaseQuantity: (product: Product) => void;
  successMessage: string;
  clearSuccessMessage: () => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [countProducts, setCountProducts] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const addToCart = (product: Product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts(updatedProducts);
    } else {
      product.quantity = 1;
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, product]);
    }
    setSuccessMessage("¡Su producto se agregó al carrito!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const removeFromCart = (product: Product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setAllProducts(results);
    setTotal(total - product.price * (product.quantity || 1));
    setCountProducts(countProducts - (product.quantity || 1));
  };

  const clearCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const decreaseQuantity = (product: Product) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === product.id && item.quantity && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setAllProducts(updatedProducts);
    setTotal(total - product.price);
    setCountProducts(countProducts - 1);
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const carritoContextValue: CarritoContextType = {
    allProducts,
    total,
    countProducts,
    addToCart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    successMessage,
    clearSuccessMessage,
  };

  return (
    <CarritoContext.Provider value={carritoContextValue}>
      {children}
    </CarritoContext.Provider>
  );
};
