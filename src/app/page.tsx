import Image from 'next/image'
import Logo from '@/assets/logo.png'
import BackgroundImg from '@/assets/background_login.png'
import { Login } from '@/components/login/Login'
import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Image
        alt="Login page background"
        src={BackgroundImg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="-z-10 object-cover brightness-50"
      />
      <main className="grid h-screen grid-cols-1 pt-10 xl:grid-cols-3">
        <Image src={Logo} alt="Imagiflix Logo" className="ml-8" />
        <section className="mx-auto mt-20 h-[500px] w-[310px] rounded-xl bg-zinc-900/90 p-6 xl:mt-0 xl:h-[800px] xl:w-[600px] xl:p-10">
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </section>
      </main>
    </>
  )
}
