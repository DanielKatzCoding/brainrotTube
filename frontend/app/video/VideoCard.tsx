'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardMedia, Slider } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import { IconButtonStyled, SliderBox, VideoFlexContainer } from './styles';

export default function VideoCard({ title, src }: { title: string; src: string }) {
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
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

    const handleSliderChange = (newValue: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = newValue;
            setProgress(newValue);
        }
    }

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
    }, [playing]);

    // Keep progress in sync if user seeks or video is paused
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        
        const updateProgress = () => setProgress(video.currentTime);
        video.addEventListener('timeupdate', updateProgress);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        };
        
    }, []);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
            <SliderBox>
                <Slider
                    value={progress}
                    min={0}
                    max={duration}
                    step={0.01}
                    onChange={(_, newValue) => {handleSliderChange(newValue)}}
                    sx={{ color: 'white', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)' }}                
                />
            </SliderBox>
        </Card>
    );
}