import { useState } from "react"
import { TextField, InputAdornment } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { useDispatch } from "react-redux"

import useStyles from "./styles"
import { searchMovie } from "../../state/currentGenreOrCategory"

const Search = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query))
    }
  }

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default Search
