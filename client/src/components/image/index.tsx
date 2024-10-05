import React from "react";
import { Box, SxProps } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
  sx?:SxProps;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt, width, height, borderRadius, objectFit = 'cover', onClick, sx }) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: width || '100%',
        height: height || 'auto',
        borderRadius: borderRadius || '0px',
        objectFit: objectFit, ...sx,
      }}
      onClick={onClick}
    />
  );
};

export default ImageComponent;
