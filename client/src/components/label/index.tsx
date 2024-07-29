import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface StyledLabelProps {
  text: string;
}

const StyledLabel: React.FC<StyledLabelProps> = ({ text }) => {
  return (
    <Box>
      <Typography>{text}</Typography>
    </Box>
  );
}

export default StyledLabel;