import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import Movie from '@/assets/movies/capa6.png'
import { PlusCircle, ThumbsUp, Volume2 } from 'lucide-react'
import { Button } from '@/components/button/Button'
import { FaPlay } from 'react-icons/fa6'
import { Close } from '../../Close'
import { MovieDetails } from '@/types/movie'
import { NEXT_API_URL } from '@/constants/constants'

type DetailsProps = {
  params: {
    type: 'tv' | 'movie'
    id: number
  }
}

async function getMovieDetails({ params }: DetailsProps): Promise<MovieDetails> {
  const response = await fetch(`${NEXT_API_URL}/api/tmdb/${params.type}/details/${params.id}`, {
    cache: 'no-cache',
  })
  return response.json()
}

export default async function Details({ params }: DetailsProps) {
  if (!NEXT_API_URL) {
    return null
  }
  const movieDetails = await getMovieDetails({ params })
  return (
    <main className="flex h-screen w-screen justify-center bg-zinc-950">
      <section className="w-full max-w-xl bg-zinc-800">
        <div className="relative h-80 w-full">
          <div className="absolute z-0 h-full w-full">
            <Image
              alt="movie"
              src={movieDetails.backdrop_path}
              quality={100}
              fill
              className="-z-10"
            />
            <div className="flex h-72 flex-col justify-between px-4 pt-4 text-zinc-50">
              <div className="flex items-center justify-end">
                <Close />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    icon={<FaPlay size={24} />}
                    text="Assistir"
                    color="primary"
                    size="sm"
                    action={`/player/${params.id}`}
                  />
                  <PlusCircle size={36} className="cursor-pointer" />
                  <ThumbsUp size={36} className="cursor-pointer" />
                </div>
                <Volume2 size={36} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-4 pt-8 text-zinc-50">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-normal">
              <span className="font-bold text-green-700">97% relevante</span>{' '}
              {movieDetails.release_date?.slice(0, 4)} 1h 29min HD
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-[10px] font-bold text-zinc-50">
                A16
              </div>
              <span className="text-[10px] font-semibold">
                Violência extrema, conteúdo sexual, drogas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={twMerge(
                  'flex h-10 w-10 flex-col items-center justify-center',
                  'rounded-lg bg-red-600 text-[10px] font-bold text-zinc-50'
                )}
              >
                <p>TOP</p>
                <p>10</p>
              </div>
              <span className="text-sm font-bold">Top 5 em filmes hoje</span>
            </div>
          </div>
          <div className="flex max-w-52 flex-col gap-6 text-[10px]/none font-medium">
            <p>
              <span className="text-zinc-500">Elenco:</span> Anna Farias, jon Abrahams,Shannon
              Elizabeth, mais
            </p>
            <p>
              <span className="text-zinc-500">Gênero:</span>{' '}
              {movieDetails.genres.map((genre) => `${genre.name}, `)}
            </p>
            <p>
              <span className="text-zinc-500">Cenas e momentos:</span> Apimentados, irreverentes,
              besteirol
            </p>
          </div>
        </div>
        <p className="max-w-96 px-4 pt-4 text-[10px] font-medium text-zinc-50">
          {movieDetails.overview}
        </p>
        <div className="p-4">
          <p className="mb-6 text-xl font-black text-zinc-50">
            <span className="text-zinc-500">Sobre: </span> {movieDetails.title}
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-medium text-zinc-50">
              <span className="text-zinc-500">Direção:</span> Keenen Ivory Wayans
            </p>
            <p className="text-[10px] font-medium text-zinc-50">
              <span className="text-zinc-500">Elenco:</span> Keenen Ivory Wayans Keenen Ivory Wayans
              Keenen Ivory Wayans Keenen Ivory Wayans Keenen Ivory Wayans Keenen Ivory Wayans Keenen
            </p>
            <p className="text-[10px] font-medium text-zinc-50">
              <span className="text-zinc-500">Roteiro:</span> {movieDetails.overview}
            </p>
            <p className="text-[10px] font-medium text-zinc-50">
              <span className="text-zinc-500">Gêneros:</span>{' '}
              {movieDetails.genres.map((genre) => `${genre.name}, `)}
            </p>
            <p className="text-[10px] font-medium text-zinc-50">
              <span className="text-zinc-500">Cenas e momentos:</span> Apimentados, Irreverentes,
              Besteirol
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
