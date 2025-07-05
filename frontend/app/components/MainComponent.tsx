"use client";
import VideoContent from "./videoComponents/VideoContent";
import React, { createContext, useState } from "react";

export const MAX_MEDIA_COUNT = 25;

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const MediaIndexContext = createContext<{
  mediaIndex: number;
  setMediaIndex: React.Dispatch<React.SetStateAction<number>>;
}>(null!);



const MainComponent = () => {
  const [mediaIndex, setMediaIndex] = useState(
    getRandomInt(0, MAX_MEDIA_COUNT),
  );
  return (
    <MediaIndexContext.Provider value={{ mediaIndex, setMediaIndex }}>
      <VideoContent />
    </MediaIndexContext.Provider>
  )
}

export default MainComponent