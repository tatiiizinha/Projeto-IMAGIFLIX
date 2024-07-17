import { NextResponse } from 'next/server'
import { PopularResponse } from '@/types/tmdb.dto'

type RouteParams = {
  params: {
    type: string
    resource: string
  }
}

export async function GET(_: Request, { params }: RouteParams) {
  const api_key = process.env.TMDB_API_KEY as string
  const api_url = process.env.TMDB_API_URL as string
  const image_url = process.env.TMDB_IMAGE_URL as string
  const url = `${api_url}/3/${params.type}/${params.resource}?api_key=${api_key}`
  try {
    const response = await fetch(url)
    const { results }: PopularResponse = await response.json()
    const movies = results.map((movie) => ({
      ...movie,
      poster_path: `${image_url}${movie.poster_path}`,
      backdrop_path: `${image_url}${movie.backdrop_path}`,
      release_date: movie?.release_date ?? movie?.first_air_date,
      title: movie?.title ?? movie?.name,
    }))
    return NextResponse.json(movies)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro ao buscar os filmes.' })
  }
}
