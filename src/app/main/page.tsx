import { Header } from '@/components/header/Header'
import { Hero } from '@/components/hero/Hero'
import { Category } from '@/components/category/Category'
import { Movie } from '@/types/movie'
import { randomInt } from 'node:crypto'
import { NEXT_API_URL } from '@/constants/constants'

async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(`${NEXT_API_URL}/api/tmdb/movie/popular`, {
    cache: 'no-cache',
  })
  return response.json()
}

async function getPopularSeries(): Promise<Movie[]> {
  const response = await fetch(`${NEXT_API_URL}/api/tmdb/tv/popular`, {
    cache: 'no-cache',
  })
  return response.json()
}

async function getTopRatedMovies(): Promise<Movie[]> {
  const response = await fetch(`${NEXT_API_URL}/api/tmdb/movie/top_rated`, {
    cache: 'no-cache',
  })
  return response.json()
}

async function getTopRatedSeries(): Promise<Movie[]> {
  const response = await fetch(`${NEXT_API_URL}/api/tmdb/tv/top_rated`, {
    cache: 'no-cache',
  })
  return response.json()
}

async function getHeroContent(): Promise<Movie & { type: 'tv' | 'movie' }> {
  const types = ['movie', 'tv']
  const type = types[randomInt(2)]
  const response = await fetch(`${NEXT_API_URL}/api/tmdb/${type}/popular`, {
    cache: 'no-cache',
  })
  const results = await response.json()
  const item = { ...results[randomInt(results?.length)], type }
  return item
}

export default async function Main() {
  if (!NEXT_API_URL) {
    return null
  }
  const [popularMovies, popularSeries, topRatedMovies, topRatedSeries, heroContent] =
    await Promise.all([
      getPopularMovies(),
      getPopularSeries(),
      getTopRatedMovies(),
      getTopRatedSeries(),
      getHeroContent(),
    ])

  return (
    <main className="bg-zinc-950">
      <Hero
        type={heroContent.type}
        id={heroContent.id}
        title={heroContent.title!}
        overview={heroContent.overview}
        backdrop_path={heroContent.backdrop_path}
      />
      <Header />
      <div className="mt-[82vh] flex flex-col gap-8 pb-8 pl-16">
        <Category title="Filmes em alta" list={popularMovies} type="movie" />
        <Category title="Séries em alta" list={popularSeries} type="tv" />
        <Category title="Filmes mais bem avaliados" list={topRatedMovies} type="movie" />
        <Category title="Séries mais bem avaliadas" list={topRatedSeries} type="tv" />
      </div>
    </main>
  )
}
