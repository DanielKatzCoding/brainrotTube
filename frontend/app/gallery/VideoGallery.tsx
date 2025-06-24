"use client";
import Grid from '@mui/material/Grid';
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import VideoCard from '../video/VideoCard';
import { useState, useRef, createContext } from 'react';
import VideoNavigator from '../navigator/VideoNavigator';
import { IMediaHistory } from '../interfaces/interfaces';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const MediaIndexContext = createContext<{
  mediaIndex: number,
    setMediaIndex: 
    React.Dispatch<React.SetStateAction<number>>
  }>(null!);

export const MediaHistoryContext = createContext<{
  mediaHistory: IMediaHistory,
    setMediaHistory: 
    React.Dispatch<React.SetStateAction<IMediaHistory>>
  }>(null!);
  
export const MaxMediaIndexContext = createContext<number>(null!);

export const getRandomInt = (min: number, max: number): number => (
    Math.floor(Math.random() * (max - min)) + min
)

export default function VideoGallery() { 
  const maxMediaIndex = 25;
  const [mediaIndex, setMediaIndex] = useState(getRandomInt(0, maxMediaIndex));
  const apiUrl = useRef(`http://localhost:8000/api/media`);
  const [mediaHistory, setMediaHistory] = useState<IMediaHistory>({
    currIndex: -1,
    mediaHistory: []
  });



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box maxWidth="xl" padding={2}>    
          <MediaHistoryContext.Provider value={{ mediaHistory, setMediaHistory }}>  
            <MaxMediaIndexContext.Provider value={maxMediaIndex}>
              <MediaIndexContext.Provider value={{ mediaIndex, setMediaIndex }}>
                <Grid container spacing={0} gap={0} alignContent="center" justifyContent="flex-start">      
                  <Grid size="auto" alignContent="center">            
                    <VideoNavigator />
                  </Grid>
                  <Grid size={10}>
                    <VideoCard title="the title" src={apiUrl.current + `?index=${mediaIndex}`} />            
                  </Grid>      
                </Grid>
              </MediaIndexContext.Provider>
            </MaxMediaIndexContext.Provider>
          </MediaHistoryContext.Provider>
        </Box>
      </main>
    </ThemeProvider>
  );
}
