import { Box } from "@mui/material";
import React from "react";
import { IconButtonStyled } from "./styles";

const ActionBar = () => {
  return (
    <Box>
      <IconButtonStyled
        aria-label="Like"
        onClick={() => console.log("Play/Pause clicked")}
      ></IconButtonStyled>
    </Box>
  );
};

export default ActionBar;
