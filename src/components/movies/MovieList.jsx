import { Grid } from "@mui/material"

import useStyles from "./styles"
import Movie from "./Movie"

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles()
  const firstMovie = excludeFirst ? 1 : 0

  movies = movies.results.filter((movie) => movie.poster_path)

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.slice(firstMovie, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  )
}

export default MovieList
