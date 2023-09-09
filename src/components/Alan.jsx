import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import {ColorModeContext} from '../utils/ToggleColorMode';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext)

  useEffect(() => {
    alanBtn({
      key: '67b80bba93fe007ce26336e01ac631122e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode }) => {
        if (command === 'changeMode') {
          if (mode === 'light')
            setMode('light')
          else
            setMode('dark')
        }
      }
    });
  }, [setMode]);
}

export default useAlan
