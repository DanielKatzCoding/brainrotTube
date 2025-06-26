import React, { useState, useRef, useEffect } from 'react'
import { Container, Slider } from "@mui/material";
import { SliderBox, VolumeBox, VolumeSliderContainer, IconButtonStyled } from './styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownAltIcon from '@mui/icons-material/VolumeDownAlt';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useVideoRef, useVideoProgress } from '../VideoPlayer';

const ControllerBar = () => {
    const videoRef = useVideoRef();
    const { progress, setProgress, duration } = useVideoProgress();
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const volumeSliderTimeout = useRef<NodeJS.Timeout | null>(null);
    const [volume, setVolume] = useState(1);

    const handleSliderChange = (newValue: number) => {
        if (videoRef && videoRef.current) {
            videoRef.current.currentTime = newValue;
            setProgress(newValue);
        }
    }
    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        const newVol = Array.isArray(newValue) ? newValue[0] : newValue;
        setVolume(newVol);
        if (videoRef && videoRef.current) {
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

    // Keep video volume in sync with state
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume, videoRef]);

    // keyboard event listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let soundKey = false;
            if (e.key === 'ArrowRight') {
                if (videoRef && videoRef.current) {
                    videoRef.current.currentTime += 5;
                }
            } else if (e.key === 'ArrowLeft') {
                if (videoRef && videoRef.current) {
                    videoRef.current.currentTime -= 5;
                }
            } else if (e.key === 'ArrowUp') {
                setVolume((prev) => Math.min(prev + 0.1, 1));
                soundKey = true;
            } else if (e.key === 'ArrowDown') {
                setVolume((prev) => Math.max(prev - 0.1, 0));
                soundKey = true;
            } else if (e.key === 'm') {
                setVolume((prev) => (prev === 0 ? 1 : 0));
                soundKey = true;
            }
            if (soundKey) {
                setShowVolumeSlider(true);
                if (volumeSliderTimeout.current) clearTimeout(volumeSliderTimeout.current);
                volumeSliderTimeout.current = setTimeout(() => setShowVolumeSlider(false), 1000);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [videoRef]);

    return (
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
    );
}

export default ControllerBar;