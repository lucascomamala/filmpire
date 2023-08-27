import { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
// import { MovieList } from '../index';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../state/currentGenreOrCategory';
import genreIcons from '../../assets/genres';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch()

  if (isLoading) return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress size='8rem' />
    </Box>
  )

  if (error) return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Link to='/'>Something has gone wrong: {error}</Link>
    </Box>
  )

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} md={4} align="center">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          className={classes.poster}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" md={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" align="center">{data?.runtime}min</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              className={classes.links}
              key={genre.name}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={1}>
          {data && data?.credits?.cast?.map((character, i) => (
            character.profile_path && (
              <Grid
                key={i}
                item
                xs={4}
                sm={2}
                component={Link}
                to={`/actors/${character.id}`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  className={classes.castImage}
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                />
                <Typography color="textPrimary" align="center">{character?.name}</Typography>
                <Typography color="textSecondary" align="center">
                  {character.character.split('/')[0]}
                </Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>

      </Grid>
    </Grid>
  )
}

export default MovieInformation