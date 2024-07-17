import { InputHTMLAttributes, useId } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { VariantProps, tv } from 'tailwind-variants'
import { Inputs } from '../form/Form'

const inputVariants = tv({
  base: 'rounded-xl p-3 focus:outline-none focus:ring-2 xl:p-6',
  variants: {
    color: {
      primary:
        'bg-zinc-500 text-zinc-100 placeholder:text-zinc-300 hover:bg-zinc-400 focus:ring-indigo-600',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

type InputProps = VariantProps<typeof inputVariants> &
  InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
    inputName: 'name' | 'email' | 'password'
  }

export function Input({ color, placeholder, inputName, register, errors, ...props }: InputProps) {
  const id = useId()

  return (
    <>
      <label className="sr-only text-zinc-50 xl:not-sr-only" htmlFor={id}>
        {placeholder}
      </label>
      <input
        id={id}
        className={inputVariants({ color })}
        placeholder={placeholder}
        {...register(inputName, { required: true, minLength: 3 })}
        {...props}
      />
      {errors[inputName] && errors[inputName]?.type === 'required' && (
        <span className="-mt-6 ml-2 text-red-600">Este campo é obrigatório</span>
      )}
      {errors[inputName] && errors[inputName]?.type === 'minLength' && (
        <span className="-mt-6 ml-2 text-red-600">
          Este campo precisa ter pelo menos 3 caracteres
        </span>
      )}
    </>
  )
}
