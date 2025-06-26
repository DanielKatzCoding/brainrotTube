'use client';

import React, { useEffect, useRef, useState, createContext, useContext, ReactNode } from 'react';
import { CardMedia } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import { IconButtonStyled, VideoFlexContainer } from './styles';

// Contexts for videoRef and progress
export const VideoRefContext = createContext<React.RefObject<HTMLVideoElement | null> | null>(null);
export const VideoProgressContext = createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function useVideoProgress() {
  const context = useContext(VideoProgressContext);
  if (!context) throw new Error('useVideoProgress must be used within VideoProgressContext.Provider');
  return context;
}

export function useVideoRef() {
  const context = useContext(VideoRefContext);
  if (!context) throw new Error('useVideoRef must be used within VideoRefContext.Provider');
  return context;
}

// Provider to wrap VideoPlayer and ControllerBar
export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <VideoRefContext.Provider value={videoRef}>
      <VideoProgressContext.Provider value={{ progress, setProgress, duration, setDuration }}>
        {children}
      </VideoProgressContext.Provider>
    </VideoRefContext.Provider>
  );
}

export default function VideoPlayer({ title, src }: { title: string; src: string }) {
    const videoRef = useVideoRef();
    const { setProgress, setDuration } = useVideoProgress();
    const [playing, setPlaying] = useState(false);
      
    const pauseBtnRef = useRef<HTMLButtonElement>(null);
    const animationRef = useRef<number | null>(null);


    const handleVideoClick = () => {
        setPlaying((prev) => !prev);
    };

    // Set duration when metadata is loaded
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // keyboard event listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault(); // Prevent scrolling
                handleVideoClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Toggle play/pause state when video is clicked
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!playing) {
            video.pause();
            pauseBtnRef.current!.hidden = false;

        } else {
            pauseBtnRef.current!.hidden = true;
            video.play();
        }
    });

    // Smooth progress bar animation
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const animate = () => {
            if (playing) {
                setProgress(video.currentTime);
                animationRef.current = requestAnimationFrame(animate);
            }
        };
        if (playing) {
            animationRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [playing, videoRef, setProgress]);

    // Keep progress in sync if user seeks or video is paused
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        
        const updateProgress = () => setProgress(video.currentTime);
        video.addEventListener('timeupdate', updateProgress);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        };
        
    }, [videoRef, setProgress]);



    return (
        <VideoFlexContainer>
            <CardMedia
                component="video"
                title={title}
                src={src}
                ref={videoRef}
                onClick={handleVideoClick}
                onLoadedMetadata={handleLoadedMetadata}
                style={{ width: '100%' }}                    
            />
            <IconButtonStyled ref={pauseBtnRef} aria-label="pause" onClick={handleVideoClick}>
                <PauseIcon sx={{ fontSize: '5rem' }} />
            </IconButtonStyled>
        </VideoFlexContainer>
    );
}