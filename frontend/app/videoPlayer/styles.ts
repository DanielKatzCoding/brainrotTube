import { styled, IconButton, Box } from '@mui/material';

export const IconButtonStyled = styled(IconButton)(() => ({
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1rem',
  width: 64,
  height: 64,
  opacity: 0.6,
  '&:hover': {
    opacity: 1,
  }
}));

export const VideoFlexContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
}));

export const SliderBox = styled(Box)(() => ({
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'flex-start', 
  width: '90%'
}));

export const VolumeBox = styled(Box)(() => ({
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  width: '10%'
}));

export const VolumeSliderContainer = styled('div')(() => ({
  position: 'absolute',
  bottom: '3.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'none',
  zIndex: 2,
}));

