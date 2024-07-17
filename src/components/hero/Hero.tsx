import { Info } from 'lucide-react'
import { FaPlay } from 'react-icons/fa6'
import Image from 'next/image'
import { Button } from '../button/Button'

type HeroProps = {
  type: 'tv' | 'movie'
  id: number
  title: string
  overview: string
  backdrop_path: string
}

export function Hero({ type, id, title, overview, backdrop_path }: HeroProps) {
  return (
    <div className="relative min-h-full">
      <div id="hero" className="absolute top-0 z-0 h-[95vh] w-full">
        <Image
          alt="Hero background"
          src={backdrop_path}
          quality={100}
          fill
          sizes="100vw"
          className="-z-10 object-fill brightness-50"
        />
        <div className="flex text-zinc-50">
          <div className="mt-60 pl-16">
            <p className="flex gap-4 text-5xl font-extrabold text-zinc-200 before:block before:h-16 before:w-2 before:bg-red-600">
              {type === 'tv' ? 'SÉRIE' : 'FILME'}
            </p>
            <div className="flex">
              {/* <div className="-ml-3 mt-6 h-12 -rotate-90 text-5xl font-extrabold">OS </div> */}
              <span className="-ml-1 text-8xl font-extrabold">{title}</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-red-600 text-xl/none font-extrabold">
                <p>TOP</p>
                <p>10</p>
              </div>
              <p className="text-3xl font-bold">Top 5 em filmes hoje</p>
            </div>
            <div className="mt-16">
              <p className="max-w-3xl truncate text-base font-medium">{overview}</p>
              <div className="mt-12 flex gap-8">
                <Button
                  icon={<FaPlay size={32} />}
                  text="Assistir"
                  color="primary"
                  action={`/player/${id}`}
                />
                <Button
                  icon={<Info size="32px" />}
                  text="Mais informações"
                  color="secondary"
                  action={`/details/${type}/${id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
