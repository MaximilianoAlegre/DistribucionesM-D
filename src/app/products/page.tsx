"use client";
import { Title } from "@/components";
import {ProductCard} from "@/components/ProductCard/page";

const TestPage: React.FC = () => {
  return (
    <div>
      <Title
        title="Productos"
        subtitle="Todos los productos"
        className="mb-2"
      />
      <div className="flex w-full ">
        <div className="w-full ">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
