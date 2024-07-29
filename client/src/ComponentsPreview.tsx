import React from 'react';
import StyledLabel from './components/label';
import {Container, Box, Typography} from '@mui/material';


const ComponentsPreview = () => {
    return (
        <Container
        sx={{
            display: 'block',
            position: 'sticky',
            top: '50px',
            left: '50px', 
            minWidth: '100vw',
            minHeight: '100vh'
          }}>
            <Typography variant="h3">Components Preview</Typography>
            <Box
            sx={{
                position:'absolute',
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:'8px',
                border:'2px solid black',
                padding:'3px'
            }}>    
            <Typography sx={{
                fontSize: '10px'
            }}>Label :</Typography>
                <StyledLabel text='Label for display info'/>
            </Box>
        </Container>
    )
}

export default ComponentsPreview;
