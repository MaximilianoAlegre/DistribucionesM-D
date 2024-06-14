"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CategoryFormInputs {
  id?: number;
  name: string;
}

export function CategoryRegisterPage(): JSX.Element {
  const [categoryData, setCategoryData] = useState<CategoryFormInputs>({
    name: "",
  });
  const [categories, setCategories] = useState<CategoryFormInputs[]>([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Definir la función fetchCategories fuera del useEffect
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

  // Obtener la lista de categorías desde la base de datos
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `/api/category/${categoryData.id}`
        : "/api/category";
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        router.push("/products"); // Redirigir a la página de categorías después de crear/editar la categoría
      } else {
        setError(`Error al ${isEditing ? "editar" : "crear"} la categoría`);
      }
    } catch (error) {
      setError(`Error al ${isEditing ? "editar" : "crear"} la categoría`);
      console.error(
        `Error al ${isEditing ? "editar" : "crear"} la categoría:`,
        error
      );
    }
  };

  const handleDelete = async () => {
    if (!categoryData.id) return;

    try {
      const response = await fetch(`/api/category/${categoryData.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategoryData({ name: "" });
        setIsEditing(false);
        fetchCategories(); // Recargar las categorías después de eliminar
      } else {
        setError("Error al eliminar la categoría");
      }
    } catch (error) {
      setError("Error al eliminar la categoría");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleCancelEdit = () => {
    setCategoryData({ name: "" });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (category: CategoryFormInputs) => {
    setCategoryData(category);
    setIsEditing(true);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="w-[90%] md:w-[60%] mx-auto">
        <h1 className="text-4xl mb-4 text-text1 text-center font-thin">
          {isEditing ? "EDITAR CATEGORÍA" : "CREAR CATEGORÍA"}
        </h1>

        {/* Nombre */}
        <label htmlFor="name" className="mb-2 block text-sm">
          Nombre de la Categoría:
        </label>
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleInputChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="Nombre de la categoría"
        />

        {error && <span className="text-red-500 text-xs">{error}</span>}

        <button type="submit" className="btn-put">
          {isEditing ? "GUARDAR CAMBIOS" : "CREAR CATEGORÍA"}
        </button>

        {isEditing && (
          <>
            <button
              type="button"
              onClick={handleDelete}
              className="btn-delete mt-2"
            >
              ELIMINAR CATEGORÍA
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

      {/* Buscador de categorías */}
      <div className="w-[90%] md:w-[60%] mx-auto mt-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 block mb-2 text-black w-full"
          placeholder="Buscar categorías por nombre"
        />
      </div>

      {/* Lista de categorías para editar */}
      <div className="w-[90%] md:w-[60%] mx-auto mt-5">
        <h2 className="text-2xl mb-4 text-text1 text-center">EDITAR CATEGORÍAS</h2>
        <ul>
          {filteredCategories.map((category) => (
            <li
              key={category.id}
              className="mb-2 flex w-full justify-between items-center bg-gris"
            >
              <p className="px-3">{category.name} </p>
              <div className="w-fit">
                <button
                  onClick={() => handleEdit(category)}
                  className="btn-primary"
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