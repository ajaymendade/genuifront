import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function ResponseBox({ response, onNext, onPrevious, counter }) {
  return (
    <Box style={{ width: '70%', height: '100vh', position: 'absolute', right: 0 }}>
      <Typography variant="body1">{response}</Typography>
      <Box>
        <IconButton onClick={onPrevious}><NavigateBeforeIcon /></IconButton>
        <Typography variant="caption">{counter}</Typography>
        <IconButton onClick={onNext}><NavigateNextIcon /></IconButton>
      </Box>
    </Box>
  );
}

export default ResponseBox;
