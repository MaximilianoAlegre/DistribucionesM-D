export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  categoryId: number;
  createdat: Date; // Cambiar de string a Date
  quantity?: number; // Propiedad opcional para manejar la cantidad
}
