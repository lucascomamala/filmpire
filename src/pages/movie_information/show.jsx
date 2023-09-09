import { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
import MovieList from '../../components/movies/MovieList'
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../state/currentGenreOrCategory';
import genreIcons from '../../assets/genres';
import Pagination from '../../components/pagination/Pagination';
import { userSelector } from '../../utils/auth';

const MovieInformation = () => {

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [isMovieFavorited, setIsMovieFavorited] = useState(false)
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false)

  const { user } = useSelector(userSelector)
  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);
  const {
    data: recommendations,
    error: recommendationsError,
    isLoading: isRecommendationsLoading
  } = useGetRecommendationsQuery({ id, list: 'recommendations', page });
  const { data: favoriteMovies } = useGetListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), listName: 'favorite/movies', page: 1 })
  const { data: watchlistMovies } = useGetListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), listName: 'watchlist/movies', page: 1 })

  const langCode = data?.original_language
  const lang = data?.spoken_languages?.find((lang) => lang.iso_639_1 === langCode)?.english_name

  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie.id === data?.id))
  }, [favoriteMovies, data])

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie.id === data?.id))
  }, [watchlistMovies, data])
  
  const addToFavorites = async () => {
    if (!user.id) return alert('You must be logged in to add a movie to your favorites.')

    await axios.post(`https:///api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited
    })

    setIsMovieFavorited((prev) => !prev)
  }

  const addToWatchList = async () => {
    if (!user.id) return alert('You must be logged in to add a movie to your favorites.')
    
    await axios.post(`https:///api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted
    })

    setIsMovieWatchlisted((prev) => !prev)
  }

  if (isLoading) return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress size='8rem' />
    </Box>
  )

  if (error || recommendationsError) return (
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
          <Typography gutterBottom variant="h6" align="center">
            {data?.runtime} min | Language: <span style={{ fontWeight: 'normal' }}>{lang}</span>
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              className={classes.links}
              key={genre.name}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} alt='genre' />
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

        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {isRecommendationsLoading && <CircularProgress size='8rem' />}
        {recommendations
          ? <>
            <MovieList movies={recommendations} numberOfMovies={12} />
            <Pagination currentPage={page} setPage={setPage} totalPages={recommendations?.total_pages} />
          </>
          : <Box>Sorry, nothing was found.</Box>
        }
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation
