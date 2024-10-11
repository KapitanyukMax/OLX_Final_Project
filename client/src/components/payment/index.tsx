import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import CardWithHandIcon from "../icons/cardWithHand";
import StyledLabel from "../lable";

interface PaymentProps{
    onClick?: () => void;
}

const Payment:React.FC<PaymentProps> = ({
    onClick
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '297px',
          width: '345px',
          backgroundColor: '#FFF',
          fontFamily: 'Nunito',
          borderRadius: '10px',
          border: 'rgba(97, 216, 90, 0.00)',
          cursor:'pointer',
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            fontFamily: 'Nunito',
            gap: '32px',
          }}
        >
            <Box>

          <CardWithHandIcon />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          <StyledLabel
            text="Оплата DDX"
            type="primary"
            textType="middle"
            fontWeight="400"
            sx={{
                color:'#737070',
            }}
            />
        </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop:'24px',
            }}>
            <StyledLabel 
                text="Картка, Google Play" 
                type="primary" 
                textType="middle"
                sx={{
                    fontFamily:'Nunito',
                    fontSize:'18px',
                    fontWeight:'400',
                    color:'#737070',
                }} />
        </Box>
      </Box>
    </StyledEngineProvider>
  );
};

export default Payment;
