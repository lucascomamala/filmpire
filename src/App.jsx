import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router-dom"

import useStyles from "./styles"

import { Actors, Movies, MovieInformation, Profile } from "./pages"
import { Navbar } from "./components"


const App = () => {
  const classes = useStyles()

  return (
    <div id='app' className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/movies/:id" element={<MovieInformation />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
