import { useRef } from "react"
import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router-dom"

import useStyles from "./styles"

import Movies from './pages/movies/index'
import MovieInformation from "./pages/movie_information/show"
import Actors from "./pages/actors/show"
import Profile from "./pages/profile/show"

import Navbar from "./components/navbar/Navbar"
import useAlan from "./components/Alan"


const App = () => {
  const classes = useStyles()
  const alanBtnContainer = useRef()
  useAlan()

  return (
    <div id='app' className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.app_toolbar} />
        <Routes>
          <Route path="/approved?" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  )
}

export default App
