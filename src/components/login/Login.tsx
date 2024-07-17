'use client'

import { useEffect, useState } from 'react'
import { Form } from '../form/Form'
import { useRouter } from 'next/navigation'

export enum LoginType {
  SIGNIN = 'Entrar',
  SINGUP = 'Criar conta',
}

export function Login() {
  const router = useRouter()
  const [type, setType] = useState<LoginType>(LoginType.SIGNIN)

  useEffect(() => {
    const userLogged = localStorage.getItem('user')
    if (!userLogged) return
    router.replace('/main')
  }, [])

  return (
    <>
      <h3 className="text-2xl font-black text-zinc-50 xl:text-5xl">{type}</h3>
      <Form loginType={type} setLoginType={setType} />
      <span className="mt-4 flex flex-col gap-4 text-sm font-extralight text-zinc-300 xl:mt-8 xl:text-xl">
        {type === LoginType.SIGNIN ? (
          <>
            <p>
              Novo na Imagiflix?{' '}
              <a
                className="ml-6 font-bold text-indigo-500 hover:text-indigo-700 hover:underline"
                href="#"
                onClick={() => setType(LoginType.SINGUP)}
              >
                Criar conta.
              </a>
            </p>
            <p>Esta página está protegida por reCAPTCHA para assegurar que você não é um robô.</p>
          </>
        ) : (
          <p>
            Já possui uma conta?{' '}
            <a
              className="ml-6 font-bold text-indigo-500 hover:text-indigo-700 hover:underline"
              href="#"
              onClick={() => setType(LoginType.SIGNIN)}
            >
              Logar.
            </a>
          </p>
        )}
      </span>
    </>
  )
}
