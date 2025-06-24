import { styled, Button } from '@mui/material';

export const CircleBtn = styled(Button)(() => ({
  minWidth: 0,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  opacity: 0.7,
    '&:hover': {
        opacity: 1,
        transition: 'opacity 0.3s ease',
    },
}));