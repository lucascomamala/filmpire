import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Box, CircularProgress, Button, Grid, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material";

import useStyles from './styles';
import MovieList from "../../components/movies/MovieList";
import { useGetActorQuery, useGetActorRecommendationsQuery } from "../../services/TMDB"

const Actors = () => {
  const { id } = useParams()
  const page=1
  const { data, error, isLoading } = useGetActorQuery(id)
  const { data: recommendations } = useGetActorRecommendationsQuery({ id, page: 1 })
  console.log(data)
  console.log(recommendations)
  
  const classes = useStyles()

  if (isLoading) return (
    <Box display='flex' justifyContent='center'>
      <CircularProgress size='8rem' />
    </Box>
  )

  if (error) return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Link to='/'>Something has gone wrong: {error}</Link>
    </Box>
  )


  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} align="center">
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.images?.profiles[0]?.file_path}`}
            className={classes.image}
            alt={data?.name}
          />
        </Grid>
        <Grid item container direction="column" md={7}>
          <Typography variant="h2" align="center" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Born {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {data?.biography || 'No biography available.'}
          </Typography>
          <Box item marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant='h2' align='center' gutterBottom>Movies</Typography>
        {recommendations?.results?.length > 0 && <MovieList movies={recommendations} numberOfMovies={12} />}
      </Box>
    </>
  )
}

export default Actors
