import { styled, Button } from "@mui/material";

export const CircleBtn = styled(Button)(() => ({
  borderRadius: "50%",
  padding: 0,
  opacity: 0.7,
  "&:hover": {
    opacity: 1,
    transition: "opacity 0.3s ease",
  },
}));
