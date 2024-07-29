import React from 'react';
import StyledLabel from './components/label';
import {Container, Box, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <StyledLabel text='Primary Label for display info' type='primary'/>
                <StyledLabel text='Head Label for display info' type='head'/>
                <StyledLabel text='Label with icon for display info' type='with-icon' icon={HomeIcon}/>
            </Box>
                
            </Box>
        </Container>
    )
}

export default ComponentsPreview;
