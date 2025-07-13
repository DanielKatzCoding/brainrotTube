"use client";
import Grid from "@mui/material/Grid";
import { Box, CssBaseline, ThemeProvider, Card } from "@mui/material";
import VideoPlayer, { VideoPlayerProvider } from "../VideoPlayer";
import { useState, useRef, createContext, useEffect, useContext } from "react";
import VideoNavigator from "../VideoNavigator";
import { IMediaContent } from "@/app/interfaces/interfaces";
import darkTheme from "@/app/theme";
import ControllerBar from "../ControllerBar";
import ActionBar from "../ActionBar";

export const MediaContext = createContext<{
  media: IMediaHistory;
  setMedia: React.Dispatch<React.SetStateAction<IMediaHistory>>;
}>(null!);

export const ProgressContext = createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}>(null!);

export default function VideoContent() {

  const [media, setMedia] = useState<IMediaHistory>({
    videoId: "",
    mediaHistory: [],
  });

  const [hovered, setHovered] = useState(false);
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
                <Grid position={"absolute"} size={"auto"} paddingLeft={1} ref={videoNavRef} style={{ transition: "opacity 0.5s" }}>
                  <MediaContext.Provider value={{ media, setMedia }}>
                    <VideoNavigator />
                  </MediaContext.Provider>
                </Grid>
                <Grid position={"absolute"} bottom={0} size={12} paddingBottom={1} ref={controllerBarRef} style={{ transition: "opacity 0.5s" }}>
                  <ControllerBar />                  
                </Grid>
                <Grid position={"absolute"} right={0} size="auto" paddingRight={1} ref={actionBarRef} style={{ transition: "opacity 0.5s" }}>
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
