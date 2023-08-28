import { useSelector } from "react-redux"
import { Box, Typography, Button } from "@mui/material"
import { ExitToApp } from "@mui/icons-material"

import { userSelector } from "../../utils/auth"
import { useGetListQuery } from "../../services/TMDB"
import RatedCards from "../../components/rated_cards/RatedCards"

const Profile = () => {
  const { user } = useSelector(userSelector)

  const { data: favoriteMovies } = useGetListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), listName: 'favorite/movies', page: 1 })
  const { data: watchlistMovies } = useGetListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), listName: 'watchlist/movies', page: 1 })

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h5">Add favourite or watchlist same movies to see them here!</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" movies={favoriteMovies} />
            <RatedCards title="Watchlist" movies={watchlistMovies} />
          </Box>
        )}
    </Box>
  );
}

export default Profile
