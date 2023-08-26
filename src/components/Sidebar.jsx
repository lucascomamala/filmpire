import { useEffect } from "react"
import { Divider, List, ListItem, ListSubheader, ListItemText, ListItemIcon, ListItemButton, Box, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import { useTheme } from "@mui/styles"

import useStyles from "./styles"

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
]

const demoGenres = [
  { label: 'Action', value: 'action' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Animation', value: 'animation' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Crime', value: 'crime' },
]

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = () => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <>
      <Link
        to="/"
        className={classes.imageLink}
      >
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            to={`/`}
            className={classes.links}
          >
            <ListItemButton onClick={() => { }}>
              <ListItemIcon>
                <img src={redLogo} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoGenres.map(({ label, value }) => (
          <Link
            key={value}
            to={`/`}
            className={classes.links}
          >
            <ListItemButton onClick={() => { }}>
              <ListItemIcon>
                <img src={redLogo} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  )
}

export default Sidebar