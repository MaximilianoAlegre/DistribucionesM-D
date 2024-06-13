"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Definir la interfaz para los datos del formulario
interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/admin");
      console.log(error);
      router.refresh();
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] md:w-1/4">
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error}
          </p>
        )}

        <h1 className="font-bold text-4xl mb-4 text-celeste text-center">
          Iniciar Sesion
        </h1>

        <label htmlFor="email" className="mb-2 block text-sm text-text2">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email es un campo obligatorio",
            },
          })}
          className="p-3 rounded block mb-2 text-black w-full"
          placeholder="user@email.com"
        />

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="mb-2 block text-sm text-text2">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña es un campo obligatorio",
            },
          })}
          className="p-3 rounded block mb-2 text-black w-full"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="btn-primary">
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
