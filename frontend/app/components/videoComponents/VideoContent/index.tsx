"use client";
import Grid from "@mui/material/Grid";
import { Box, CssBaseline, ThemeProvider, Card } from "@mui/material";
import VideoPlayer, { VideoPlayerProvider } from "../VideoPlayer";
import { useState, useRef, createContext, useEffect, useContext } from "react";
import VideoNavigator from "../VideoNavigator";
import { IMediaHistory } from "@/app/interfaces/interfaces";
import darkTheme from "@/app/theme";
import ControllerBar from "../ControllerBar";
import ActionBar from "../ActionBar";

export const MediaHistoryContext = createContext<{
  mediaHistory: IMediaHistory;
  setMediaHistory: React.Dispatch<React.SetStateAction<IMediaHistory>>;
}>(null!);

export const ProgressContext = createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}>(null!);



export default function VideoContent() {

  const [mediaHistory, setMediaHistory] = useState<IMediaHistory>({
    currIndex: 0,
    mediaHistory: [],
  });

  const [hovered, setHovered] = useState(false);

  const apiUrl = useRef(`http://localhost:8000/api`);
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
                <MediaHistoryContext.Provider value={{ mediaHistory, setMediaHistory }}>
                  <Grid size={12}>
                    <VideoPlayer />
                  </Grid>
                  <Grid position={"absolute"} size={"auto"} paddingLeft={1} ref={videoNavRef} style={{ transition: "opacity 0.5s" }}>
                    <VideoNavigator />
                  </Grid>
                  <Grid position={"absolute"} bottom={0} size={12} paddingBottom={1} ref={controllerBarRef} style={{ transition: "opacity 0.5s" }}>
                    <ControllerBar />                  
                  </Grid>
                  <Grid position={"absolute"} right={0} size="auto" paddingRight={1} ref={actionBarRef} style={{ transition: "opacity 0.5s" }}>
                    <ActionBar />
                  </Grid>       
                </MediaHistoryContext.Provider>                
              </Grid>
            </VideoPlayerProvider>
          </Card>
        </Box>
      </main>
    </ThemeProvider>
  );
}
