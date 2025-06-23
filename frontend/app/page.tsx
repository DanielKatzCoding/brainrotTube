import fs from 'fs';
import path from 'path';
import VideoGallery from './video/VideoGallery';
import { CssBaseline } from "@mui/material";
import React from 'react';


export default async function Home() {
  const mediaDir = path.join(process.cwd(), 'public', 'media');
  const files = fs.readdirSync(mediaDir).filter(file => file.endsWith('.mp4'));

  return (
    <>
      <VideoGallery files={files} />
    </>
  );
}
