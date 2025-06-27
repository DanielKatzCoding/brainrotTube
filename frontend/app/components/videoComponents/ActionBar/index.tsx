import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IconButtonStyled } from "./styles";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';

const ActionBar = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

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
