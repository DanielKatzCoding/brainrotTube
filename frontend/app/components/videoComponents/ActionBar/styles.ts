import { styled, IconButton, Box } from "@mui/material";

export const IconButtonStyled = styled(IconButton)(() => ({
  fontSize: "1rem",
  width: 64,
  height: 64,
  opacity: 0.6,
  "&:hover": {
    opacity: 1,
  },
}));