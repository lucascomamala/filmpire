import { useState, useEffect } from "react"
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { useGetMoviesQuery } from "../../services/TMDB"
import MovieList from "./MovieList"

const Movies = () => {
  const { data, error, isLoading } = useGetMoviesQuery()

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
    <MovieList movies={data} />
  )
}

export default Movies
