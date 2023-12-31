import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import {ColorModeContext} from '../utils/ToggleColorMode';
import { selectGenreOrCategory, searchMovie } from '../state/currentGenreOrCategory'

import { fetchToken } from "../utils"

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    alanBtn({
      key: '67b80bba93fe007ce26336e01ac631122e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase())

          if (foundGenre) {
            navigate('/')
            dispatch(selectGenreOrCategory(foundGenre.id))
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory
            navigate('/')
            dispatch(selectGenreOrCategory(category.id))
          }
        } else if (command === 'changeMode') {
          if (mode === 'light')
            setMode('light')
          else
            setMode('dark')
        } else if (command === 'login') {
          fetchToken()
        } else if (command === 'logout') {
          localStorage.clear('')
          navigate('/')
        } else if(command === 'search') {
          dispatch(searchMovie(query))
        }

      }
    });
  }, [setMode, dispatch, navigate]);
}

export default useAlan
