export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  first_air_date?: string
  title?: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetails = {
  backdrop_path: string
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  first_air_date?: string
  status: string
  title?: string
  name?: string
  runtime: number
  vote_average: number
}
