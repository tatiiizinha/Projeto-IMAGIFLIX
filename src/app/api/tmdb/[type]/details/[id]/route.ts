import { NextResponse } from 'next/server'
import { MovieResponse } from '@/types/tmdb.dto'

type RouteParams = {
  params: {
    type: string
    id: string
  }
}

export async function GET(_: Request, { params }: RouteParams) {
  const api_key = process.env.TMDB_API_KEY as string
  const api_url = process.env.TMDB_API_URL as string
  const image_url = process.env.TMDB_IMAGE_URL as string
  const url = `${api_url}/3/${params.type}/${params.id}?api_key=${api_key}`
  try {
    const response = await fetch(url)
    const result: MovieResponse = await response.json()
    const movie = {
      ...result,
      backdrop_path: `${image_url}${result.backdrop_path}`,
      poster_path: `${image_url}${result.poster_path}`,
      release_date: result?.release_date ?? result?.first_air_date,
      title: result?.title ?? result?.name,
    }
    return NextResponse.json(movie)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro ao busca os filmes.' })
  }
}
