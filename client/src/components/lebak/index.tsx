import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SvgIconProps } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './style.css';

interface StyledLabelProps {
    text: string;
    type: 'primary' | 'head' | 'with-icon' | 'no-background';
    textType: 'small' | 'middle' | 'big';
    icon?: React.ElementType<SvgIconProps>;
}

const StyledLabel1: React.FC<StyledLabelProps> = ({ text, type, textType, icon: Icon }) => {
    const getClassName = () => {
        switch (type) {
            case 'primary':
                return 'primary-label';
            case 'head':
                return 'head-label';
            case 'with-icon':
                return 'with-icon-label';
            case 'no-background':
                return 'no-background-label';
            default:
                return 'primary-label';
        }
    };

    const getTextStyle = ()=>{
        switch (textType) {
            case 'small':
                return 'small-label-text';
            case 'middle':
                return 'middle-label-text';
            case 'big':
                return 'big-label-text';
            default:
                return 'middle-label-text';
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Box className={getClassName()}>
                {Icon && (
                    <Box className="icon-container">
                        <Icon />
                    </Box>
                )}
                <Typography className={getTextStyle()}>{text}</Typography>
            </Box>
            </StyledEngineProvider>
        
    );
};

export default StyledLabel1;


{/* <Box className="label-container" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Icon && <Icon />}
            <Typography className={getClassName()}>{text}</Typography>
        </Box> */}