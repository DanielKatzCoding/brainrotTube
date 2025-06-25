"use client";
import Grid from '@mui/material/Grid';
import { Box, CssBaseline, ThemeProvider, Card } from "@mui/material";
import VideoPlayer from '../videoPlayer/VideoPlayer';
import { useState, useRef, createContext } from 'react';
import VideoNavigator from '../navigator/VideoNavigator';
import { IMediaHistory } from '../interfaces/interfaces';
import darkTheme from '../theme';

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

export default function VideoContent() { 
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
        <Box maxWidth="xl" margin={2}>    
          <MediaHistoryContext.Provider value={{ mediaHistory, setMediaHistory }}>  
            <MaxMediaIndexContext.Provider value={maxMediaIndex}>
              <MediaIndexContext.Provider value={{ mediaIndex, setMediaIndex }}>
                  <Card>
                    <Grid container justifyContent="flex-start" alignItems="center">
                      <Grid size="auto" paddingLeft={2} paddingRight={2}>
                        <VideoNavigator />
                      </Grid>
                      <Grid size={10}>
                        <VideoPlayer title="the title" src={apiUrl.current + `?index=${mediaIndex}`} />            
                      </Grid>
                    </Grid>
                  </Card>
              </MediaIndexContext.Provider>
            </MaxMediaIndexContext.Provider>
          </MediaHistoryContext.Provider>
        </Box>
      </main>
    </ThemeProvider>
  );
}
