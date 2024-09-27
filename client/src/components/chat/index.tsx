import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { StyledInput } from "../input";
import CrossStyledIcon from "../icons/cross";
import MenuDotsIcon from "../icons/menuDots";
import ImageComponent from "../image";
import PhotoBaselineIcon from "../icons/photoBaseline";
import PaperClipIcon from "../icons/paperClip";
import EmojiSmileIcon from "../icons/emoji";
import SendMessageIcon from "../icons/sendMessageIcon";
interface ChatProps {
    messages: string[];
    onSend: (message: string) => void;
    type?: 'modal' | 'page';
    icon?:string,
    width?:string,
    height?:string,
    userName?:string,
    image?:string,
    advertId:string,
    advertHeader:string,
}

const Chat: React.FC<ChatProps>=({
    messages,
    onSend,
    type,
    width = '799px',
    height = '680px',
    userName = 'User user',
    image = 'https://cdn.shopify.com/s/files/1/0015/5117/1636/files/American_Bully.jpg?v=1683716137',
    advertId = '00000000',
    advertHeader = 'Продам собаку породи американський буллі',
})=>{

    const [newMessage, setNewMessage] = useState<string>("");
    const [showEmoji, setShowEmoji] = useState(false);

    const handleSendMessage = ()=>{
        if(newMessage.trim()!==''){
            onSend(newMessage);
            setNewMessage('');
        }
    };

    return(
        <Box sx={{
            display: 'flex',
            justifyContent:'space-between',
            flexDirection: 'column',
            width: width,
            height:height,
            alignItems:'flex-start',
            backgroundColor:'#737070',

        }}>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                width:'100%',
            }}>
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                padding:'12px 20px',
                alignItems:'center',
                gap:'36px',
                alignSelf:'stretch',
                backgroundColor:'#254ACE',
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:'32px',
                    color:'white',
                }}>
                    <Box sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        width:'86px',
                        height:'86px',
                        borderRadius:'50%',
                        border:'1px solid white',
                        overflow:'hidden'
                    }}>
                        <ImageComponent 
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        src="data:image/jpeg;base64,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" alt="UserPhoto"/>
                    </Box>
                    <Typography sx={{
                        color:'white',
                        fontSize:'22px',
                        fontWeight:400,
                        fontFamily:'Nunito',
                        fontStyle:'normal',
                        lineHeight:'normal',
                    }}>{userName}</Typography>
                </Box>
                <Box sx={{
                    display:'flex',
                    width:'86px',
                    height:'32px',
                    alignItems:'center',
                    justifyContent:'space-around',
                }}>
                    <MenuDotsIcon/>
                    <CrossStyledIcon/>
                </Box>
            </Box>
            
                <Box sx={{
                    display:'flex',
                    padding:'12px 6px',
                    alignItems:'center',
                    gap:'24px',
                    alignSelf:'stretch',
                    background:'white'
                }}>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'row',
                        gap:'24px',
                        width:'100%',
                    }}>
                        <Box sx={{
                            width:'122px',
                            height:'69px',
                        }}>
                            <ImageComponent src={image} alt="advertPhoto"/>
                        </Box>
                        <Box sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap:'16px',
                            alignItems:'start',
                        }}>
                            <Typography sx={{
                                color:'#737070',
                                fontFamily:'Nunito',
                                fontSize:'14px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                            }}>ID : {advertId}</Typography>
                            <Box sx={{
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'left',
                                height:'45px',
                                
                            }}>
                                <Typography sx={{
                                    color:'black',
                                    fontFamily:'Nunito',
                                    fontSize:'14px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    textAlign:'left',
                                }}>
                                    {advertHeader}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                </Box>
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                padding:'18px 20px',
                alignItems: 'center',
                alignSelf:'stretch',
                position:'relative',
                bottom:'0px',
                gap:'18px',
                backgroundColor:'white',
            }}>
                <Box>
                    <PhotoBaselineIcon/>
                </Box>
                <Box>
                    <PaperClipIcon/>
                </Box>
                <StyledInput width="100%" value='Type a message...' iconEnd={SendMessageIcon} iconEndClick={handleSendMessage}/>
                <Box>
                    <EmojiSmileIcon/>
                </Box>
            </Box>
        </Box>
    )
}

export default Chat;