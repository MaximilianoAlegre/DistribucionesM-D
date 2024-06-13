import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-2xl font-semibold my-5`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="mb-5">{subtitle}</h3>}
    </div>
  );
};
