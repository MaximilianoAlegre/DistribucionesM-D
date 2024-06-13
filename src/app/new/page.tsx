"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProductFormInputs {
  id?: number;
  title: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  categoryId: number;
}

function ProductCreatePage(): JSX.Element {
  const [productData, setProductData] = useState<ProductFormInputs>({
    title: "",
    description: "",
    image: "",
    price: 0,
    inStock: 0,
    categoryId: 1, // Valor inicial de la categoría
  });
  const [products, setProducts] = useState<ProductFormInputs[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Definir la función fetchProducts fuera del useEffect
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

  // Obtener la lista de categorías y productos desde la base de datos
  useEffect(() => {
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

    fetchCategories();
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `/api/products/${productData.id}`
        : "/api/products";
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/products"); // Redirigir a la página de productos después de crear/editar el producto
      } else {
        setError(`Error al ${isEditing ? "editar" : "crear"} el producto`);
      }
    } catch (error) {
      setError(`Error al ${isEditing ? "editar" : "crear"} el producto`);
      console.error(
        `Error al ${isEditing ? "editar" : "crear"} el producto:`,
        error
      );
    }
  };

  const handleDelete = async () => {
    if (!productData.id) return;

    try {
      const response = await fetch(`/api/products/${productData.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProductData({
          title: "",
          description: "",
          image: "",
          price: 0,
          inStock: 0,
          categoryId: 1,
        });
        setIsEditing(false);
        fetchProducts(); // Recargar los productos después de eliminar
      } else {
        setError("Error al eliminar el producto");
      }
    } catch (error) {
      setError("Error al eliminar el producto");
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleCancelEdit = () => {
    setProductData({
      title: "",
      description: "",
      image: "",
      price: 0,
      inStock: 0,
      categoryId: 1,
    });
    setIsEditing(false);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (product: ProductFormInputs) => {
    setProductData(product);
    setIsEditing(true);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="w-[90%] md:w-[60%] mx-auto">
        <h1 className="text-4xl mb-4 text-text1 text-center font-thin">
          {isEditing ? "EDITAR PRODUCTO" : "CREAR PRODUCTO"}
        </h1>

        {/* Título */}
        <label htmlFor="title" className="mb-2 block text-sm">
          Título:
        </label>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="Título del producto"
        />

        {/* Precio */}
        <label htmlFor="price" className="mb-2 block text-sm">
          Precio:
        </label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleNumberInputChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="Precio del producto"
        />

        {/* Categoría */}
        <label htmlFor="categoryId" className="mb-2 block text-sm">
          Categoría:
        </label>
        <select
          name="categoryId"
          value={productData.categoryId}
          onChange={handleNumberInputChange}
          className="p-3 block mb-2 text-black w-full"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Imagen */}
        <label htmlFor="image" className="mb-2 block text-sm">
          Imagen URL:
        </label>
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="URL de la imagen del producto"
        />

        {/* Stock */}
        <label htmlFor="inStock" className="mb-2 block text-sm">
          Stock: <span className="text-yellow-500">SIEMPRRE COLOCAR 1</span>
        </label>
        <input
          type="number"
          name="inStock"
          value={productData.inStock}
          onChange={handleNumberInputChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="Cantidad en stock"
        />

        {/* Descripción */}
        <label htmlFor="description" className="mb-2 block text-sm">
          Descripción:
        </label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="p-3 block mb-2 text-black w-full resize-none h-[100px]"
          placeholder="Descripción del producto"
        />

        {error && <span className="text-red-500 text-xs">{error}</span>}

        <button type="submit" className="btn-put">
          {isEditing ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
        </button>

        {isEditing && (
          <>
            <button
              type="button"
              onClick={handleDelete}
              className="btn-delete mt-2"
            >
              ELIMINAR PRODUCTO
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn-primary mt-2"
            >
              CANCELAR
            </button>
          </>
        )}
      </form>

      {/* Buscador de productos */}
      <div className="w-[90%] md:w-[60%] mx-auto mt-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="Buscar productos por título"
        />
      </div>

      {/* Lista de productos para editar */}
      <div className="w-[90%] md:w-[60%] mx-auto mt-5">
        <h2 className="text-2xl mb-4 text-text1 text-center">EDITAR PRODUCTOS</h2>
        <ul>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="mb-2 flex justify-between items-center w-full bg-gris"
            >
              <div className="flex justify-center items-center space-x-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-[50px] h-[50px]"
                />
                <p className="px-3">{product.title} - ${product.price}{" "}</p>
              </div>
              <div className="w-fit">
                <button
                  onClick={() => handleEdit(product)}
                  className="btn-primary font-thin"
                >
                  EDITAR
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductCreatePage;
