"use client";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import VideoCard from './VideoCard';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function VideoGallery() {
  const [media_index, setMediaIndex] = useState(0);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Container maxWidth="xl">
          <Grid container spacing={2}>            
            <VideoCard key={1} title="the title" src={`http://localhost:8000/api/media?index=${media_index}`} />            
          </Grid>
          <Grid container spacing={2}>
            <Button variant="contained" color="primary" 
            onClick={() => setMediaIndex((prev) => (prev + 1))}>
              Next Video
            </Button>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
