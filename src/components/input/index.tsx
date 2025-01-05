/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from "react-hook-form";


interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({ name, placeholder, type, register, error, rules }: InputProps) {
  return (
    <div>
      <input
        className="w-full max-w-92 border-2 rounded-2xl h-11 px-2 outline-none bg-bgInput"
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />

      {error && <p className="my-1 text-red">{error}</p>}
    </div>
  )
}

