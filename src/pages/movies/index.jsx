import { useState } from "react"
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material"
import { useSelector } from "react-redux"

import MovieList from '../../components/movies/MovieList'
import { useGetMoviesQuery } from "../../services/TMDB"
import Pagination from "../../components/pagination/Pagination"
import FeaturedMovie from "../../components/movies/FeaturedMovie"

const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery })

  const sm = useMediaQuery((theme) => theme.breakpoints.only("sm"))
  const md = useMediaQuery((theme) => theme.breakpoints.only("md"))
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"))
  const xl = useMediaQuery((theme) => theme.breakpoints.only("xl"))
  let numberOfMovies = 8
  if (sm) numberOfMovies = 16
  if (md) numberOfMovies = 20
  if (lg) numberOfMovies = 20
  if (xl) numberOfMovies = 18


  if(isLoading) return (
    <Box display='flex' justifyContent='center'>
      <CircularProgress size='4rem' />
    </Box>
  )

  if(!data.results.length) return (
    <Box display='flex' alignItems='center' mt='20px'>
      <Typography variant='h4'>No movies that match.</Typography>
    </Box>
  )

  if(error) return (
    <Box display='flex' alignItems='center' mt='20px'>
      <Typography variant='h4'>Error: {error}</Typography>
    </Box>
  )

  return (
    <>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </>
  )
}

export default Movies
