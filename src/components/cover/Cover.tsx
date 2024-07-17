'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Hover } from '../hover/Hover'
import { Movie } from '@/types/movie'

type CoverProps = {
  item: Movie
  type: 'tv' | 'movie'
}

export function Cover({ item, type }: CoverProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>()

  function debounceTime(delay: number) {
    const id = setTimeout(onOpen, delay)
    setTimeoutId(id)
  }

  return (
    <>
      <Image
        alt={item.title!}
        src={item.poster_path}
        width={250}
        height={400}
        className="cursor-pointer rounded-md"
        onMouseOut={() => clearTimeout(timeoutId)}
        onMouseOver={() => debounceTime(1000)}
        onClick={() => router.push(`/details/${type}/${item.id}`)}
      />
      <Hover
        onClose={onClose}
        isOpen={isOpen}
        id={item.id}
        type={type}
        backdrop_path={item.backdrop_path}
        release_date={item.release_date!}
      />
    </>
  )
}
