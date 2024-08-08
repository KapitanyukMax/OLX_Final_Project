import React from 'react';
import { Typography } from '@mui/material';
import { TypographyTypeProps } from './index.types';

const convertCssClassToSx = (className: string) => {
  switch (className) {
    case 'primaryLabel':
      return {
        backgroundColor: 'var(--dark-blue)',
        padding: '5px',
        borderRadius: '5px',
        fontWeight: 400,
        fontSize: '10px'
      };
    case 'headLabel':
      return {
        backgroundColor: 'var(--dark-blue)',
        padding: '5px',
        borderRadius: '5px'
      };
    case 'withIconLabel':
      return {
        color: 'var(--dark-blue)',
        backgroundColor: 'white',
        padding: '5px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5px'
      };
    case 'noBackgroundLabel':
      return {
        color: 'var(--dark-blue)',
        padding: '5px',
        borderRadius: '5px',
        fontSize: 'small'
      };
    default:
      return {};
  }
};

const NewTypography = (props: TypographyTypeProps) => {
  const color = props.color || 'var(--dark-blue)';
  const className = props.className || 'primaryLabel';
  const sxStyle = convertCssClassToSx(className);

  return (
    <Typography {...props} sx={{ ...sxStyle, color }}>
      {props.children}
    </Typography>
  );
};

export default NewTypography;
