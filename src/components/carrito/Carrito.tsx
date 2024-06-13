'use client'
import React from "react";
import Link from "next/link";
import { IoIosClose, IoLogoWhatsapp } from "react-icons/io";
import { useCarrito } from "@/contexts/CarritoContext";
import { Product } from "@/types/productTypes";
import { IoAdd, IoRemove } from "react-icons/io5";
import { Sidebar } from "../ui/sidebar/Sidebar";

const Carrito = () => {
  const { allProducts, total, countProducts, addToCart, removeFromCart, clearCart, decreaseQuantity } = useCarrito();

  const onDeleteProduct = (product: Product) => {
    removeFromCart(product);
  };

  const onCleanCart = () => {
    clearCart();
  };

  const redirectToWhatsApp = () => {
    const cartContent = allProducts
      .map(
        (product) => `${product.quantity} x ${product.title} - $${product.price}`
      )
      .join("\n");
    const cartTotal = `Total a pagar: $${total}`;
    const fullContent = `Hola me gustaría comprar estos productos:\n\n${cartContent}\n\n${cartTotal}`;
  
    // Crear un elemento temporal para copiar al portapapeles
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = fullContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
  
    // Redirigir al enlace de WhatsApp con el contenido del carrito prellenado en el mensaje
    window.open(
      `https://api.whatsapp.com/send?phone=3755586849&text=${encodeURIComponent(
        fullContent
      )}`,
      "_blank"
    );
  }

  const handleIncrement = (product: Product) => {
    addToCart(product);
  };

  const handleDecrement = (product: Product) => {
    decreaseQuantity(product);
  };

  return (
    <header>
      <div className="w-full mt-28">
        <Link href={"/products"}>
          <p className="mt-5 text-text1 underline underline-offset-4 text-xs">CONTINUAR COMPRANDO</p>
        </Link>
        <div className={`md:flex justify-around w-full bg-BG-2 rounded-md p-3 gap-5`}>
          {allProducts.length ? (
            <>
              <div className="w-[90%] md:w-[60%] mx-auto">
                {allProducts.map((product) => (
                  <div key={product.id}>
                    <div className="md:flex w-full h-[260px] md:h-[150px] justify-between items-center md:space-x-3 mt-3">
                      {/* Imagen */}
                      <div className="w-full md:w-fit flex justify-center items-center overflow-hidden">
                        <img src={product.image} alt={product.title} className="object-contain w-[90px] h-[90px]" />
                      </div>
                      {/* Titulo and Price */}
                      <div className="w-full">
                        <div className="flex justify-between w-full p-3 mt-1 space-x-3">
                          <p className="text-text1 font-bold text-xl">{product.title}</p>
                          <span className="text-text1 font-bold text-xl">${product.price}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex w-full items-center space-x-1">
                            <button onClick={() => handleDecrement(product)} className="p-2 focus:outline-none">
                              <IoRemove />
                            </button>
                            <span className="p-2">{product.quantity}</span>
                            <button onClick={() => handleIncrement(product)} className="p-2 focus:outline-none">
                              <IoAdd />
                            </button>
                          </div>
                          <span onClick={() => onDeleteProduct(product)} className="text-text2 font-bold underline underline-offset-8 cursor-pointer md:ml-2 p-3">BORRAR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center space-x-3 mt-5">
                  <div onClick={onCleanCart} className="btn-primary cursor-pointer">
                    <IoIosClose size={40} />
                    <p>Vaciar Carrito</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center mx-auto w-[90%] md:w-[40%] h-fit bg-gris text-white p-5 border-t-4 border-gris2 mt-3">
                <div className="">
                  <h1 className="p-3">Resumen de orden</h1>

                  <div className="flex justify-between text-text2">
                    <p className="p-2">Cantidad de productos:</p>
                    <span className="p-2">{countProducts}</span>
                  </div>
                  <div className="flex justify-between text-text1">
                    <p className="p-2 font-bold text-xl">SUBTOTAL</p>
                    <span className="p-2 font-bold text-xl">${total}</span>
                  </div>
                </div>
                <div>
                  <button onClick={redirectToWhatsApp} className="btn-primary">
                    <IoLogoWhatsapp className="text-green-700" size={20} />
                    <p>Realizar Pedido</p>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Carrito;
