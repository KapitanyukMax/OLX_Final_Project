import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SvgIconProps } from '@mui/material';

interface StyledLabelProps {
  text: string;
  type: 'primary'| 'head' | 'with-icon';
  icon?:React.ElementType<SvgIconProps>;
}

const StyledLabel: React.FC<StyledLabelProps> = ({ text, type, icon: Icon }) => {
    const getStyle =()=>{
        switch(type){
            case 'primary':
                return {
                    color: 'black',
                    backgroundColor: 'grey',
                    padding: '5px',
                    borderRadius: '5px'
                }
            case 'head':
                return {
                    color: 'white',
                    backgroundColor: 'black',
                    padding: '5px',
                    borderRadius: '5px'
                }
            case 'with-icon':
                return {
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '5px',
                }
            default:
                return {
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '5px'
    };
}
};
    return (
    <Box sx={{display:'flex', alignItems:'center', gap:'8px'}}>
        {Icon && <Icon/>}
      <Typography sx={getStyle()}>{text}</Typography>
    </Box>
  );
};

export default StyledLabel;