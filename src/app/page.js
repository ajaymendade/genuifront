'use client'

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, CircularProgress, styled } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// Custom styled components for enhanced look
const SimilarPromptsBox = styled(Box)({
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '16px',
  overflow: 'hidden',
  backgroundColor: '#f9f9f9',
});

const SimilarPromptButton = styled(Button)({
  margin: '4px',
  borderRadius: '9999px',
  backgroundColor: '#f0f0f0',
  color: '#333',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [similarPrompts, setSimilarPrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/generate-response', { prompt });
      const { response, similar_prompts } = res.data;

      const newResponse = {
        prompt: prompt,
        response: response,
      };
      setResponses([...responses, newResponse]);
      setCurrentIndex(responses.length);

      // Update similar prompts
      setSimilarPrompts(similar_prompts);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
  };

  const handlePromptClick = (newPrompt) => {
    setPrompt(newPrompt);
  };

  const navigateResponses = (direction) => {
    if (direction === 'next' && currentIndex < responses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', p: 2 }}>
      <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Typography variant="h6">Prompt</Typography>
        <TextField
          fullWidth
          multiline
          rows={12}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          variant="outlined"
          placeholder="Enter your prompt here"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleGenerate}>Generate</Button>
          <Button variant="outlined" onClick={handleClear}>Clear</Button>
        </Box>
        <SimilarPromptsBox sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: '12px' }}>Similar Prompts</Typography>
          {similarPrompts.map((group, index) => (
            <Box key={index} sx={{ marginBottom: '12px' }}>
              {group.map((p, idx) => (
                <SimilarPromptButton key={idx} variant="contained" onClick={() => handlePromptClick(p)}>
                  {p}
                </SimilarPromptButton>
              ))}
            </Box>
          ))}
        </SimilarPromptsBox>
      </Box>
      <Box sx={{ width: '75%', ml: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6">Response</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigateResponses('prev')}><ArrowBackIosIcon /></IconButton>
            <Typography variant="body1" component="span" sx={{ mx: 2 }}>{currentIndex + 1}/{responses.length}</Typography>
            <IconButton onClick={() => navigateResponses('next')}><ArrowForwardIosIcon /></IconButton>
          </Box>
        </Box>
        <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)', height: '400px', border: '1px solid #ccc', borderRadius: '4px', padding: 2, mt: 1 }}>
          {loading && (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ textAlign: 'center' }}>Response is being generated...</Typography>
            </Box>
          )}
          {responses[currentIndex] && !loading && (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: '12px' }}>Prompt:</Typography>
              <Typography variant="body1" sx={{ marginBottom: '24px' }}>{responses[currentIndex].prompt}</Typography>
              <Typography variant="h6" sx={{ marginBottom: '12px' }}>Response:</Typography>
              <ReactMarkdown>{responses[currentIndex].response}</ReactMarkdown>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
