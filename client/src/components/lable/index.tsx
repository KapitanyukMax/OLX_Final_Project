import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SvgIconProps } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './style.css';

interface StyledLabelProps {
  text: string;
  type: 'primary' | 'head' | 'with-icon' | 'status';
  textType: 'small' | 'middle' | 'status' | 'head' | 'small-bold';
  textColor?: string;
  backgroundColor?: string;
  icon?: React.ElementType<SvgIconProps>;
  onClick?: () => void;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const StyledLabel: React.FC<StyledLabelProps> = ({
  text,
  type,
  textType,
  icon: Icon,
  textColor,
  backgroundColor,
  onClick,
  fontWeight,
  textAlign,
}) => {
  const getClassName = () => {
    switch (type) {
      case 'primary':
        return 'primary-label';
      case 'head':
        return 'head-label';
      case 'with-icon':
        return 'with-icon-label';
      case 'status':
        return 'status-label';
      default:
        return 'primary-label';
    }
  };

  const getTextStyle = () => {
    switch (textType) {
      case 'small':
        return 'small-label-text';
      case 'small-bold':
        return 'small-label-text-bold';
      case 'middle':
        return 'middle-label-text';
      case 'status':
        return 'status-label-text';
      case 'head':
        return 'head-label-text';
      default:
        return 'middle-label-text';
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box
        className={getClassName()}
        sx={{ backgroundColor }}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {Icon && (
          <Box className="icon-container">
            <Icon />
          </Box>
        )}
        <Typography
          className={getTextStyle()}
          color={textColor}
          sx={{ fontWeight: fontWeight, textAlign: textAlign }}
        >
          {text}
        </Typography>
      </Box>
    </StyledEngineProvider>
  );
};

export default StyledLabel;
