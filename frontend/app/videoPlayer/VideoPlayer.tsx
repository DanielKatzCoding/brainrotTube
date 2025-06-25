'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardMedia, Container, Slider } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownAltIcon from '@mui/icons-material/VolumeDownAlt';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { IconButtonStyled, VideoFlexContainer, SliderBox, VolumeBox, VolumeSliderContainer } from './styles';

export default function VideoPlayer({ title, src }: { title: string; src: string }) {
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const pauseBtnRef = useRef<HTMLButtonElement>(null);
    const animationRef = useRef<number | null>(null);
    const volumeSliderTimeout = useRef<NodeJS.Timeout | null>(null);


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

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        const newVol = Array.isArray(newValue) ? newValue[0] : newValue;
        setVolume(newVol);
        if (videoRef.current) {
            videoRef.current.volume = newVol;
        }
    };

    const getVolumeIcon = () => {
        if (volume === 0) {
            return <VolumeOffIcon sx={{ fontSize: '2rem' }} />;
        } else if (volume < 0.4) {
            return <VolumeMuteIcon sx={{ fontSize: '2rem' }} />;
        } else if (volume < 0.7) {
            return <VolumeDownAltIcon sx={{ fontSize: '2rem' }} />;
        } else {
            return <VolumeUpIcon sx={{ fontSize: '2rem' }} />;
        }
    }

    // keyboard event listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let soundKey = false;
            if (e.key === ' ') {
                e.preventDefault(); // Prevent scrolling
                handleVideoClick();
            } else if (e.key === 'ArrowRight') {
                if (videoRef.current) {
                    videoRef.current.currentTime += 5; // Skip forward 5 seconds
                }
            } else if (e.key === 'ArrowLeft') {
                if (videoRef.current) {
                    videoRef.current.currentTime -= 5; // Skip backward 5 seconds
                }
            } else if (e.key === 'ArrowUp') {
                setVolume((prev) => Math.min(prev + 0.1, 1)); // Increase volume
                soundKey = true;
            } else if (e.key === 'ArrowDown') {
                setVolume((prev) => Math.max(prev - 0.1, 0)); // Decrease volume
                soundKey = true;
            } else if (e.key === 'm') {
                setVolume((prev) => (prev === 0 ? 1 : 0)); // Mute/unmute
                soundKey = true;
            }
            if (soundKey) {
                setShowVolumeSlider(true);
                if (volumeSliderTimeout.current) clearTimeout(volumeSliderTimeout.current);
                volumeSliderTimeout.current = setTimeout(() => setShowVolumeSlider(false), 1000);
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (volumeSliderTimeout.current) clearTimeout(volumeSliderTimeout.current);
        }
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

    // Keep video volume in sync with state
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);


    return (
        <>
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
            <Container sx={{ color: 'white', display: 'flex', width: '100%', height: '4rem', gap: '1rem', justifyContent: 'space-between'}}>
                <SliderBox>
                    <Slider
                        value={progress}
                        min={0}
                        max={duration}
                        step={0.01}
                        onChange={(_, newValue) => { handleSliderChange(newValue as number) }}
                        sx={{ color: 'white', flex: 1, transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)' }}
                    />
                </SliderBox>
                <VolumeBox
                    sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    onMouseEnter={e => {
                        const slider = e.currentTarget.querySelector('.volume-slider-container') as HTMLDivElement;
                        if (slider) slider.style.display = 'block';
                    }}
                    onMouseLeave={e => {
                        const slider = e.currentTarget.querySelector('.volume-slider-container') as HTMLDivElement;
                        if (slider) slider.style.display = 'none';
                    }}
                >
                    <VolumeSliderContainer className="volume-slider-container" style={{ display: showVolumeSlider ? 'block' : undefined }}>
                        <Slider
                            orientation="vertical"
                            value={volume}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={handleVolumeChange}
                            sx={{ height: 80, color: 'white' }}
                        />
                    </VolumeSliderContainer>
                    <IconButtonStyled aria-label="volume" onClick={() => setVolume(prev => (prev === 0 ? 1 : 0))}>
                        { getVolumeIcon() }
                    </IconButtonStyled>
                </VolumeBox>                
            </Container>
        </>
    );
}