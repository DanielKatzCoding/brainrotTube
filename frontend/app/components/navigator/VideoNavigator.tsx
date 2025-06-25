'use client'

import React, { useContext } from 'react'
import { Box } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircleBtn } from './style'
import { MediaHistoryContext, MediaIndexContext, MaxMediaCountContext, getRandomInt } from '../videoContent/VideoContent'

const VideoNavigator = () => {
    const {mediaIndex, setMediaIndex} = useContext(MediaIndexContext)
    const maxMediaIndex = useContext(MaxMediaCountContext)
    const {mediaHistory, setMediaHistory} = useContext(MediaHistoryContext);
    
    const handleFirst = () => {
        setMediaHistory(() => ({
            currIndex: 0, 
            mediaHistory: [mediaIndex]
        }));
    }
    
    const handleNext = () => {
        if (mediaHistory.mediaHistory.length === 0) {
            handleFirst();
        }
        
        // To allow history media navigation.
        if (mediaHistory.currIndex < mediaHistory.mediaHistory.length - 1) {
            setMediaHistory((prev) => ({
                currIndex: prev.currIndex + 1, 
                mediaHistory: prev.mediaHistory
            }));

            setMediaIndex(mediaHistory.mediaHistory[mediaHistory.currIndex + 1]);
        } else {

            // If the current index is the last in the history, 
            // we need to generate a new media index.
            // If 5 attempts to find a new media index fail, show media
            // even if it is already in the history.
            let stackLoopLimit = 5;
            while (stackLoopLimit > 0) {
                const mediaIndex = getRandomInt(0, maxMediaIndex);
                if (!mediaHistory.mediaHistory.includes(mediaIndex) 
                    || stackLoopLimit === 1) {
                    
                    setMediaIndex(mediaIndex);
                    setMediaHistory((prev) => ({
                        currIndex: prev.currIndex + 1, 
                        mediaHistory: [...prev.mediaHistory, mediaIndex]
                    }));
                    break;
                }

                stackLoopLimit--;
            }
        }
    }

    const handleBackward = () => {
        if (mediaHistory.mediaHistory.length === 0 || mediaHistory.currIndex === 0) return;
        setMediaIndex(mediaHistory.mediaHistory[mediaHistory.currIndex - 1]);
        setMediaHistory((prev) => ({
            currIndex: prev.currIndex - 1, 
            mediaHistory: prev.mediaHistory
        }));
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <CircleBtn onClick={() => handleBackward()}>
                <KeyboardArrowUpIcon sx={{fontSize: '3.6rem', padding: '.5rem'}} />
            </CircleBtn>
            <CircleBtn onClick={() => handleNext()}>
                <KeyboardArrowDownIcon sx={{fontSize: '3.6rem', padding: '.5rem'}} />
            </CircleBtn>
        </Box>
    )
}

export default VideoNavigator