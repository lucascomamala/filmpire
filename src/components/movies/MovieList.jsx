import { Grid } from "@mui/material"

import useStyles from "./styles"
import Movie from "./Movie"

const MovieList = ({ movies, numberOfMovies }) => {
  const classes = useStyles()

  movies = movies.results.filter((movie) => movie.poster_path)

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  )
}

export default MovieList
