"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

interface ProductFormInputs {
  title: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  categoryId: number;
}

type ProductEditProps = {
  params: {
    id: string;
  };
};

function ProductEditPage({ params }: ProductEditProps): JSX.Element {
  const router = useRouter();
  const [productData, setProductData] = useState<ProductFormInputs>({
    title: "",
    description: "",
    image: "",
    price: 0,
    inStock: 0,
    categoryId: 1,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          return notFound();
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener el producto");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener las categorías");
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/products");
      } else {
        setError("Error al editar el producto");
      }
    } catch (error) {
      setError("Error al editar el producto");
      console.error("Error al editar el producto:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/products");
      } else {
        setError("Error al eliminar el producto");
      }
    } catch (error) {
      setError("Error al eliminar el producto");
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
    }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="w-1/4 md:w-1/2 mx-auto">
        <h1 className="text-text1 text-3xl p-2 w-full text-center font-thin">EDITAR PRODUCTO</h1>

        {/* Título */}
        <label htmlFor="title" className=" mb-2 block text-sm">
          Título:
        </label>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
          className="p-3  block mb-2 text-black w-full"
          placeholder="Título del producto"
        />

        {/* Precio */}
        <label htmlFor="price" className=" mb-2 block text-sm">
          Precio:
        </label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleNumberInputChange}
          className="p-3  block mb-2 text-black w-full"
          placeholder="Precio del producto"
        />

        {/* Categoría */}
        <label htmlFor="categoryId" className=" mb-2 block text-sm">
          Categoría:
        </label>
        <select
          name="categoryId"
          value={productData.categoryId}
          onChange={handleNumberInputChange}
          className="p-3  block mb-2 text-black w-full"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Imagen */}
        <label htmlFor="image" className=" mb-2 block text-sm">
          Imagen URL:
        </label>
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          className="p-3  block mb-2 text-black w-full"
          placeholder="URL de la imagen del producto"
        />

        {/* Stock */}
        <label htmlFor="inStock" className=" mb-2 block text-sm">
          Stock (Siempre colocar 1)
        </label>
        <input
          type="number"
          name="inStock"
          value={productData.inStock}
          onChange={handleNumberInputChange}
          className="p-3  block mb-2 text-black w-full"
          placeholder="Cantidad en stock"
        />

        {/* Descripción */}
        <label htmlFor="description" className=" mb-2 block text-sm">
          Descripción:
        </label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="p-3  block mb-2 text-black w-full resize-none h-[100px]"
          placeholder="Descripción del producto"
        />

        {error && <span className="text-red-500 text-xs">{error}</span>}

        <div className="flex justify-between">
          <button type="submit" className="btn-put">
            ACTUALIZAR PRODUCTO
          </button>
          <div className="h-full bg-gray-200 w-1"/>
          <button
            type="button"
            onClick={handleDelete}
            className="btn-delete"
          >
            ELIMINAR PRODUCTO
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductEditPage;
