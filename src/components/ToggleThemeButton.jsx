import { Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../reducers/features/ThemeSlice';


function ToggleThemeButton() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleThemeChange = () => {
    dispatch(toggleTheme());
    console.log('Theme changed');
  };
  return (
    <Button variant="contained" color="primary" onClick={() => handleThemeChange()}> Toggle Theme</Button>
  )
}

export default ToggleThemeButton