'use client'

import { ChakraProvider } from '@chakra-ui/react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ChakraProvider>{children}</ChakraProvider>
}
