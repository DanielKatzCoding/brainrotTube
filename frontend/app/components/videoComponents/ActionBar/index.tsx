import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { IconButtonStyled } from "./styles";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
import { MediaHistoryContext } from "../VideoContent";

const ActionBar = () => {
  const { mediaHistory, setMediaHistory } = useContext(MediaHistoryContext);
  const [likes, setLikes] = useState(mediaHistory.mediaHistory[mediaHistory.currIndex].likesCount);
  const [comments, setComments] = useState(mediaHistory.mediaHistory[mediaHistory.currIndex].commentsCount);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    const videoData = mediaHistory.mediaHistory[mediaHistory.currIndex];
    setLikes(videoData.likesCount);
    setComments(videoData.commentsCount)

  }, [mediaHistory])

  const likeCountUpdate = () => {
    if (!liked) {
      setLikes((prev => prev + 1));
    } else {
      setLikes(prev => Math.max(prev - 1, 0));
    }

    setLiked(prev => !prev);
  }

  const commentCountUpdate = () => {
    if (!commented) {
      setComments(prev => prev + 1);
    } else {
      setComments(prev => Math.max(prev - 1, 0));
    }

    setCommented(prev => !prev);
  };
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButtonStyled      
        aria-label="Like"        
        onClick={likeCountUpdate}>
          <FavoriteBorderSharpIcon sx={{ fontSize: '2rem' }} />
          <span style={{ marginLeft: '8px', fontSize: '1rem' }}>{likes}</span>
      </IconButtonStyled>
      <IconButtonStyled
        aria-label="Comment"
        onClick={commentCountUpdate}>
          <CommentSharpIcon sx={{ fontSize: '2rem' }} />
          <span style={{ marginLeft: '8px', fontSize: '1rem' }}>{comments}</span>
      </IconButtonStyled>
    </Box>
  );
};

export default ActionBar;
