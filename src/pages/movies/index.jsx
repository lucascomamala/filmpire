import { useState } from "react"
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material"
import { useSelector } from "react-redux"

import MovieList from '../../components/movies/MovieList'
import { useGetMoviesQuery } from "../../services/TMDB"
import Pagination from "../../components/pagination/Pagination"

const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery })

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
      <MovieList movies={data} />
      <Pagination />
    </>
  )
}

export default Movies
