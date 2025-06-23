"use client";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { CssBaseline } from "@mui/material";
import VideoCard from './VideoCard';

interface VideoGalleryProps {
  files: string[];
}

export default function VideoGallery({ files }: VideoGalleryProps) {
  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {
              files.map((f, idx) => (
                <VideoCard key={idx} title={f.split('.')[0]} src={`/media/${f}`} />
              ))
            }
          </Grid>
        </Container>
      </main>
    </>
  );
}
