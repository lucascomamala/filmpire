import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router-dom"

import { Actors, Movies, MovieInformation, Profile } from "./pages"
import { Navbar } from "./components"


const App = () => {
  return (
    <div id='app'>
      <CssBaseline />
      <Navbar />
      <main>
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
