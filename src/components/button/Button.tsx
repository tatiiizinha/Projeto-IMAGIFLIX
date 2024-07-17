'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { VariantProps, tv } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex cursor-pointer items-center justify-center gap-4 rounded-xl',
  variants: {
    color: {
      primary: 'bg-zinc-50 text-zinc-950 hover:bg-zinc-400',
      secondary: 'bg-zinc-50/30 text-zinc-50 hover:bg-zinc-50/10',
    },
    size: {
      sm: 'h-10 w-52',
      md: 'h-14 w-60',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

type ButtonProps = {
  icon: ReactNode
  text: string
  action: string
} & ButtonVariants &
  ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ icon, text, color, action, size }: ButtonProps) {
  const router = useRouter()

  return (
    <button className={buttonVariants({ color, size })} onClick={() => router.push(action)}>
      {icon}
      <span className="text-xs font-bold">{text}</span>
    </button>
  )
}
