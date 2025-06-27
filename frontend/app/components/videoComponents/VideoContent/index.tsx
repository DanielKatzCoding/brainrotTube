"use client";
import Grid from "@mui/material/Grid";
import { Box, CssBaseline, ThemeProvider, Card } from "@mui/material";
import VideoPlayer, { VideoPlayerProvider } from "../VideoPlayer";
import { useState, useRef, createContext } from "react";
import VideoNavigator from "../VideoNavigator";
import { IMediaHistory } from "../../../interfaces/interfaces";
import darkTheme from "../../../theme";
import ControllerBar from "../ControllerBar";
import ActionBar from "../ActionBar";

const MAX_MEDIA_COUNT = 25;

export const MediaIndexContext = createContext<{
  mediaIndex: number;
  setMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}>(null!);

export const MediaHistoryContext = createContext<{
  mediaHistory: IMediaHistory;
  setMediaHistory: React.Dispatch<React.SetStateAction<IMediaHistory>>;
}>(null!);

export const ProgressContext = createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}>(null!);

export const MaxMediaCountContext = createContext<number>(null!);

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export default function VideoContent() {
  const [mediaIndex, setMediaIndex] = useState(
    getRandomInt(0, MAX_MEDIA_COUNT),
  );
  const apiUrl = useRef(`http://localhost:8000/api/media`);
  const [mediaHistory, setMediaHistory] = useState<IMediaHistory>({
    currIndex: -1,
    mediaHistory: [],
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box maxWidth="xl" margin={2}>
          <Card>
            <VideoPlayerProvider>
              <Grid container justifyContent="flex-start" alignItems="center">
                <Grid size={1}>
                  <MediaIndexContext.Provider value={{ mediaIndex, setMediaIndex }}>
                    <MaxMediaCountContext.Provider value={MAX_MEDIA_COUNT}>    
                      <MediaHistoryContext.Provider value={{ mediaHistory, setMediaHistory }}>
                        <VideoNavigator />
                      </MediaHistoryContext.Provider>
                    </MaxMediaCountContext.Provider>
                  </MediaIndexContext.Provider>
                </Grid>
                <Grid size={10.5}>
                  <VideoPlayer
                    title="video"
                    src={apiUrl.current + `?index=${mediaIndex}`}
                  />
                  <ControllerBar />
                </Grid>
                <Grid size={.5}>
                  <ActionBar />
                </Grid>
              </Grid>              
            </VideoPlayerProvider>
          </Card>
        </Box>
      </main>
    </ThemeProvider>
  );
}
