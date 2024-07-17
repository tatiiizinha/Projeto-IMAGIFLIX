import { Movie, MovieDetails } from './movie'

export type TMDBResponse<ResultType> = {
  page: number
  results: ResultType[]
  total_page: number
  total_results: number
}

export type PopularResponse = TMDBResponse<Movie>

export type MovieResponse = MovieDetails
