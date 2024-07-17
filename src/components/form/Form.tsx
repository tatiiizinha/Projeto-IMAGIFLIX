import { Dispatch, FormHTMLAttributes, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { UseToastOptions, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../input/Input'
import { LoginType } from '../login/Login'

type FormProps = {
  loginType: LoginType
  setLoginType: Dispatch<SetStateAction<LoginType>>
} & FormHTMLAttributes<HTMLFormElement>

export type Inputs = {
  name: string
  email: string
  password: string
}

type UserProps = {
  id: number
  attributes: {
    name: string
    email: string
  }
}

const ToastConfig: UseToastOptions = {
  title: 'Falha ao logar.',
  description: 'Não foi possível realizar o login. Tente novamente mais tarde.',
  status: 'error',
  duration: 5000,
  isClosable: true,
  position: 'top-right',
}

export function Form({ loginType, setLoginType, ...props }: FormProps) {
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loginType === LoginType.SINGUP) return await signup(data)
    await signin(data.email, data.password)
  }

  async function signin(email: string, password: string) {
    try {
      const response = await fetch('/api/signin', {
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const result = await response.json()
      if (!response.ok) {
        toast({ ...ToastConfig, description: result.message })
      }
      localStorage.setItem('user', JSON.stringify({ name: result.name, email }))
      router.push('/main')
    } catch (error: any) {
      console.log(error.message)
      toast(ToastConfig)
    }
  }

  async function signup({ name, email, password }: Inputs) {
    try {
      const body = {
        name,
        email,
        password,
      }
      const response = await fetch('/api/signup', {
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const { message } = await response.json()
      toast({
        ...ToastConfig,
        title: 'Criação de conta',
        description: message,
        status: 'success',
      })
      setLoginType(LoginType.SIGNIN)
    } catch (error) {
      toast({
        ...ToastConfig,
        title: 'Falha ao criar conta',
        description: 'Não foi possível criar a conta. Tente novamente mais tarde.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex flex-col gap-6" {...props}>
      {loginType === LoginType.SINGUP && (
        <Input
          type="text"
          placeholder="Seu Nome"
          inputName="name"
          register={register}
          errors={errors}
        />
      )}
      <Input
        type="text"
        placeholder="Email ou número"
        defaultValue=""
        inputName="email"
        register={register}
        errors={errors}
      />
      <Input
        type="password"
        placeholder="Sua senha"
        inputName="password"
        register={register}
        errors={errors}
      />
      <button
        className="mt-4 rounded-xl bg-red-600 p-3 text-sm font-extrabold text-zinc-50 hover:bg-red-800 xl:p-6 xl:text-3xl"
        type="submit"
      >
        {loginType}
      </button>
    </form>
  )
}
