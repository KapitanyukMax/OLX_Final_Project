import React from "react";
import {Box} from "@mui/material";


interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?:string;
  onClick?: () =>void;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt, width, height, borderRadius, onClick }) => {
  return (
    <Box 
        component = "img"
        src = {src}
        alt = {alt}
        sx={{
            width: width || '100%',
            height: height || 'auto',
            borderRadius: borderRadius || '0px',
        }}
        onClick = {onClick}
    />
  );
};


export default ImageComponent;