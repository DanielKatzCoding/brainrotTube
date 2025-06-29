"use client";
import Grid from "@mui/material/Grid";
import { Box, CssBaseline, ThemeProvider, Card } from "@mui/material";
import VideoPlayer, { VideoPlayerProvider } from "../VideoPlayer";
import { useState, useRef, createContext, useEffect } from "react";
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

  const [mediaHistory, setMediaHistory] = useState<IMediaHistory>({
    currIndex: -1,
    mediaHistory: [],
  });

  const [hovered, setHovered] = useState(false);

  const apiUrl = useRef(`http://localhost:8000/api/media`);
  const videoNavRef = useRef<HTMLDivElement | null>(null);
  const controllerBarRef = useRef<HTMLDivElement | null>(null);
  const actionBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!videoNavRef.current || !controllerBarRef.current || !actionBarRef.current) return;
    
    if (hovered) {
      videoNavRef.current.style.opacity = "100%";
      controllerBarRef.current.style.opacity = "100%";
      actionBarRef.current.style.opacity = "100%";
    } else {
      videoNavRef.current.style.opacity = "0%";
      controllerBarRef.current.style.opacity = "0%";
      actionBarRef.current.style.opacity = "0%";
    }
    
  }, [hovered]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box maxWidth="xl" margin={2}>
          <Card>
            <VideoPlayerProvider>                               
              <Grid container alignItems={"center"}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
                <Grid size={12}>
                  <VideoPlayer
                    title="video"
                    src={apiUrl.current + `?index=${mediaIndex}`}
                  />
                </Grid>
                <Grid position={"absolute"} size={"auto"} padding={1} ref={videoNavRef} style={{ transition: "opacity 0.5s" }}>
                  <MediaIndexContext.Provider value={{ mediaIndex, setMediaIndex }}>
                    <MaxMediaCountContext.Provider value={MAX_MEDIA_COUNT}>    
                      <MediaHistoryContext.Provider value={{ mediaHistory, setMediaHistory }}>
                        <VideoNavigator />
                      </MediaHistoryContext.Provider>
                    </MaxMediaCountContext.Provider>
                  </MediaIndexContext.Provider>
                </Grid>
                <Grid position={"absolute"} bottom={0} size={12} padding={1} ref={controllerBarRef} style={{ transition: "opacity 0.5s" }}>
                  <ControllerBar />                  
                </Grid>
                <Grid position={"absolute"} right={0} size="auto" padding={1} ref={actionBarRef} style={{ transition: "opacity 0.5s" }}>
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
