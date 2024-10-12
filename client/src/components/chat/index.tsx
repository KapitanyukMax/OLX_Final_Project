import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { StyledInput } from "../input";
import CrossStyledIcon from "../icons/cross";
import MenuDotsIcon from "../icons/menuDots";
import ImageComponent from "../image";
import PhotoBaselineIcon from "../icons/photoBaseline";
import PaperClipIcon from "../icons/paperClip";
import EmojiSmileIcon from "../icons/emoji";
import SendMessageIcon from "../icons/sendMessageIcon";
import EmojiPicker from "emoji-picker-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";

interface ChatProps {
    messages?: Message[];
    onSend: (message: string, imageUrl?: string) => void;
    width?: string;
    height?: string;
    userName?: string;
    image?: string;
    advertId: string;
    advertHeader: string;
    sellerId: string;
}

interface Message {
    id?: string;
    authorId: string;
    text: string;
    sendingDate: Date;
    chatId?: string;
    advertId?: string;
    imageUrl?: string | null;
    sellerId: string;
}

const Chat: React.FC<ChatProps> = ({
    width = '799px',
    height = '680px',
    userName = 'User  user',
    image = 'https://cdn.shopify.com/s/files/1/0015/5117/1636/files/American_Bully.jpg?v=1683716137',
    advertId = '1K12juVvtl5jrp7URpAS',
    advertHeader = 'Продам собаку породи американський буллі',
    sellerId
}) => {
    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatId, setChatId] = useState<string | null>(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const storage = getStorage();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const host = import.meta.env.VITE_HOST;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedImage) {
            setNewMessage('');
        }
    }, [selectedImage]);

    const loadMessages = async (chatId: string) => {
        if (!chatId) return; 
    
        try {
            const response = await axios.get(`${host}/messages/chat/${chatId}`);
            const messagesData = response.data;
            
            setMessages((prevMessages: Message[]) => {
                
                const newMessages = messagesData.filter(
                    (newMessage: Message) => !prevMessages.some(msg => msg.id === newMessage.id)
                );
                return [...prevMessages, ...newMessages];
            });
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    };

    useEffect(() => {
        if (chatId) {
            loadMessages(chatId);
        }
    }, [chatId]);
    const handleSendMessage = async () => {
        const buyerId = user?.uid;
    
        setNewMessage('');
        
        if (newMessage.trim() !== '' || selectedImage) {
            let imageUrl: string | undefined;
    
            if (selectedImage) {
                try {
                    const imageRef = ref(storage, `chat-images/${selectedImage.name}`);
                    await uploadBytes(imageRef, selectedImage);
                    imageUrl = await getDownloadURL(imageRef);
                } catch (error) {
                    console.error("Error uploading image: ", error);
                    return;
                }
            }
    
            const message: Message = {
                text: newMessage,
                sendingDate: new Date(),
                authorId: user?.uid || 'Unknown',
                advertId: advertId,
                imageUrl: imageUrl || null,
                sellerId: sellerId || 'Unknown',
                chatId: chatId || 'Unknown',
            };
    
            try {
                let currentChatId = chatId;
    
                const advertResponse = await axios.get(`${host}/adverts/${advertId}`);
                if (advertResponse.status !== 200) {
                    console.error('Failed to fetch advert:', advertResponse);
                    return;
                }
    
                const advertData = await advertResponse.data;
                const sellerId = advertData.userId;
                if (!sellerId) {
                    console.error('sellerId is undefined');
                    return;
                }
    
                const createChatResponse = await axios.post(`${host}/chats`, {
                    advertId,
                    buyerId: user?.uid,
                    sellerId,
                });
    
                if (createChatResponse.status !== 201) { 
                    throw new Error('Failed to create chat');
                }
    
                const chatData = createChatResponse.data;
                currentChatId = chatData.id;
    
                message.chatId = currentChatId ?? undefined;
    
                const sendMessageResponse = await axios.post(`${host}/messages`, message);
                console.log("SendmessageResponse", sendMessageResponse.data);
    
                const newMessageWithId: Message = {
                    ...message,
                    id: sendMessageResponse.data?.id || Math.random().toString(36).substr(2, 9),
                };
    
                setMessages((prevMessages) => [...prevMessages, newMessageWithId]);
                setSelectedImage(null);
                await loadMessages(currentChatId);
    
            } catch (e) {
                console.error("Error handling chat and message: ", e);
            }
        }
    };
    

    const handleEmojiSelect = (emoji: any) => {
        setNewMessage(prev => prev + emoji.emoji);
        setShowEmoji(false);
    };

    const handlePaperclipClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: width,
            height: height,
            alignItems: 'flex-start',
            backgroundColor: '#737070',
            boxSizing:'border-box',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '12px 20px',
                    alignItems: 'center',
                    backgroundColor: '#254ACE',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '32px',
                        color: 'white',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '86px',
                            height: '86px',
                            borderRadius: '50%',
                            border: '1px solid white',
                            overflow: 'hidden',
                        }}>
                            <ImageComponent width="100%" height="100%" objectFit="cover" src={image} alt="User Photo" />
                        </Box>
                        <Typography sx={{
                            color: 'white',
                            fontSize: '22px',
                            fontWeight: 400,
                            fontFamily: 'Nunito',
                            lineHeight: 'normal',
                        }}>{userName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        <MenuDotsIcon onClick={() => console.log('Dots clicked')} />
                        <CrossStyledIcon onClick={() => setSelectedImage(null)} />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    padding: '12px 6px',
                    background: 'white',
                    alignItems: 'center',
                    gap: '24px',
                }}>
                    <Box sx={{ width: '122px', height: '69px' }}>
                        <ImageComponent src={image} alt="advertPhoto" />
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign:'left',
                        gap: '6px',
                        margin:'0px 0px 48px 0px'
                    }}>
                        <Typography sx={{ fontSize: '14px', color: '#737070' }}>ID : {advertId}</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{advertHeader}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        flexGrow: 1,
    }}
>
    {messages.map((msg) => (
        <Box
            key={msg.id}
            sx={{
                alignSelf: msg.authorId === user?.uid ? 'flex-end' : 'flex-start',
                backgroundColor: msg.authorId === user?.uid ? '#DCF8C6' : '#FFFFFF',
                color: '#000',
                padding: '10px 15px',
                borderRadius: '10px',
                maxWidth: '70%',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                wordBreak: 'break-word',
            }}
        >
            <Typography
                sx={{
                    fontSize: '14px',
                    fontWeight: msg.authorId === user?.uid ? 'bold' : 'normal',
                }}
            >
                {msg.text}
            </Typography>
            {msg.imageUrl && (
                <Box
                    component="img"
                    src={msg.imageUrl}
                    alt="message image"
                    sx={{
                        marginTop: '10px',
                        maxWidth: '100%',
                        borderRadius: '8px',
                    }}
                />
            )}
        </Box>
    ))}
</Box>


            <Box sx={{
                display: 'flex',
                padding: '18px 10px 18px 20px',
                gap: '18px',
                backgroundColor: 'white',
                alignItems: 'center',
                width:'100%',
                boxSizing:'border-box',
            }}>
                <PhotoBaselineIcon onClick={() => console.log('Photo icon clicked')} />
                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
                <PaperClipIcon onClick={handlePaperclipClick} />
                <StyledInput
                    value={newMessage}
                    width="100%"
                    iconEnd={SendMessageIcon}
                    iconEndClick={handleSendMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <EmojiSmileIcon onClick={() => setShowEmoji(!showEmoji)} />
                {showEmoji && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
            </Box>
        </Box>
    );
};

export default Chat;