import React from 'react';
import { TextField, Button, Box } from '@mui/material';

function PromptBox({ onGenerate, onClear, onPromptChange, prompt }) {
  return (
    <Box style={{ width: '30%', height: '50vh', position: 'absolute', top: 0, left: 0 }}>
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        label="Prompt"
        value={prompt}
        onChange={onPromptChange}
      />
      <Button onClick={onGenerate} color="primary" variant="contained">Generate</Button>
      <Button onClick={onClear} color="secondary" variant="contained">Clear</Button>
    </Box>
  );
}

export default PromptBox;
