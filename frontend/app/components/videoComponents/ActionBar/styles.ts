import { styled, IconButton, Box } from "@mui/material";

export const IconButtonStyled = styled(IconButton)(() => ({
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1rem",
  width: 64,
  height: 64,
  opacity: 0.6,
  "&:hover": {
    opacity: 1,
  },
}));

export const VideoFlexContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
}));
