"use client";
import Grid from "@mui/material/Grid";
import { Box, CssBaseline, ThemeProvider, Card } from "@mui/material";
import VideoPlayer, { VideoPlayerProvider } from "../VideoPlayer";
import { useState, useRef, createContext } from "react";
import VideoNavigator from "../VideoNavigator";
import { IMediaHistory } from "../../../interfaces/interfaces";
import darkTheme from "../../../theme";
import ControllerBar from "../ControllerBar";

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
          <MediaHistoryContext.Provider
            value={{ mediaHistory, setMediaHistory }}
          >
            <MaxMediaCountContext.Provider value={MAX_MEDIA_COUNT}>
              <MediaIndexContext.Provider value={{ mediaIndex, setMediaIndex }}>
                <VideoPlayerProvider>
                  <Card>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid size="auto" paddingLeft={2} paddingRight={2}>
                        <VideoNavigator />
                      </Grid>
                      <Grid size={10}>
                        <VideoPlayer
                          title="the title"
                          src={apiUrl.current + `?index=${mediaIndex}`}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid size={12}>
                        <ControllerBar />
                      </Grid>
                    </Grid>
                  </Card>
                </VideoPlayerProvider>
              </MediaIndexContext.Provider>
            </MaxMediaCountContext.Provider>
          </MediaHistoryContext.Provider>
        </Box>
      </main>
    </ThemeProvider>
  );
}
