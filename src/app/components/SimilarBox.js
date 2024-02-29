import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';

function SimilarPrompts({ prompts, onPromptSelect }) {
  return (
    <Box style={{ width: '30%', position: 'absolute', bottom: 0, left: 0 }}>
      <List>
        {prompts.map((prompt, index) => (
          <ListItem button key={index} onClick={() => onPromptSelect(prompt)}>
            <ListItemText primary={prompt} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SimilarPrompts;
