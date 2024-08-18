import StyledLabel from './components/lable';
import StyledButton from './components/button';
import StyledIconButton from './components/iconButton';
import { Container, Box, Typography } from '@mui/material';
import { StyledInput } from './components/input';
import { Mail, RemoveRedEye, Password, Favorite, FavoriteBorderOutlined, SearchOffRounded } from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/system';
import { StyledCheckBox } from './components/checkBox';
import { StyledTextArea } from './components/textArea';
import ImageComponent from './components/image';
import { ArrowDownBlackIcon, ArrowDownWhiteIcon } from './components/icons/arrowDown';
import SearchIcon from './components/icons/search';
import MicrophoneIcon from './components/icons/microphone';
import PlusIcon from './components/icons/plus';
import UserProfileIcon from './components/icons/userProfile';
import MessageIcon from './components/icons/message';
import HeartIcon from './components/icons/heart';
import LocationIcon from './components/icons/location';
import CalendarSolidIcon from './components/icons/calendarSolid';
import CarFillIcon from './components/icons/carFill';
import AreaIcon from './components/icons/area';
import PasswordIcon from './components/icons/password';
import FacebookIcon from './components/icons/facebook';
import GoogleIcon from './components/icons/google';
import AppleIcon from './components/icons/apple';
import CheckBoxIcon from './components/icons/checkbox';
import ArrowUpIcon from './components/icons/arrowUp';
import GeneratorIcon from './components/icons/generator';
import TransportSparePartIcon from './components/icons/transportSparePart';
import BusinessManIcon from './components/icons/businessman';
import HeartFilledIcon from './components/icons/heartFilled';
import FurnitureIcon from './components/icons/furniture';
import ClothesIcon from './components/icons/clothes';
import SportsIcon from './components/icons/sports';
import CarIcon from './components/icons/car';
import HomeAndGardenIcon from './components/icons/homeAndGarden';
import CalendarIcon from './components/icons/calendar';
import ChildrenToyIcon from './components/icons/childrenToy';
import PhoneIcon from './components/icons/phone';
import WorkIcon from './components/icons/work';
import RealEstateAgentIcon from './components/icons/realEstateAgent';
import CatIcon from './components/icons/cat';
import HandIcon from './components/icons/hand';
import MaterialSymbolIcon from './components/icons/materialSymbol';
import BaselineFacebookIcon from './components/icons/baselineFacebook';
import InstagramIcon from './components/icons/instagram';
import TwitterIcon from './components/icons/twitter';
import YoutubeIcon from './components/icons/youtube';
import DownloadGooglePlay from './components/icons/downloadGooglePlay';
import DownloadAppStore from './components/icons/downloadAppStore';
import './global.css';
import { StyledAdvert } from './components/advert';
import InformationSection from './components/informationSection';
import StyledFooter from './components/footer';
import HeartWhiteIcon from './components/icons/heartWhite';
import MessageWhiteIcon from './components/icons/messageWhite';
import UserProfileWhiteIcon from './components/icons/userProfileWhite';
import { Header } from './components/header';
import { StyledDropdown } from './components/dropdown';

const ComponentsPreview = () => {
    return (
        <StyledEngineProvider injectFirst>
            <Container
                sx={{
                    display: 'block',
                    position: 'sticky',
                    minWidth: '100vw',
                    minHeight: '100vh'
                }}>
                <Typography variant="h3">Components Preview</Typography>
                <Box>
                    <Typography variant='h5' textAlign='start'>Information Section</Typography>
                    <InformationSection></InformationSection>
                </Box>
                <Box>
                    <Typography variant='h5' textAlign='start'>Header</Typography>
                    <Box>
                        <Header></Header>
                    </Box>
                </Box>
                <Box>
                    <Typography variant='h5' textAlign='start'>Footer</Typography>
                    <Box>
                        <StyledFooter></StyledFooter>
                    </Box>
                </Box>
                <Box>
                    <Typography variant='h5'>Icons</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'var(--green)',
                        padding: '5px',
                        gap: '5px',
                        alignItems: 'center',
                    }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '8px',
                                justifyContent: 'space-between',
                            }}>
                            <HeartWhiteIcon />
                            <MessageWhiteIcon />
                            <UserProfileWhiteIcon />
                            <SearchIcon />
                            <MicrophoneIcon />
                            <PlusIcon />
                            <UserProfileIcon />
                            <MessageIcon />
                            <HeartIcon />
                            <LocationIcon />
                            <CalendarSolidIcon />
                            <CarFillIcon />
                            <AreaIcon />
                            <PasswordIcon />
                            <FacebookIcon />
                            <GoogleIcon />
                            <AppleIcon />
                            <CheckBoxIcon />
                            <ArrowUpIcon />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='h5'>Icons</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'var(--green)',
                            padding: '5px',
                            gap: '5px',
                            alignItems: 'center',
                        }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '8px',
                                    justifyContent: 'space-between',
                                }}>

                                <ArrowDownBlackIcon />
                                <ArrowDownWhiteIcon />
                                <SearchIcon />
                                <MicrophoneIcon />
                                <PlusIcon />
                                <UserProfileIcon />
                                <MessageIcon />
                                <HeartIcon />
                                <LocationIcon />
                                <CalendarSolidIcon />
                                <CarFillIcon />
                                <AreaIcon />
                                <PasswordIcon />
                                <FacebookIcon />
                                <GoogleIcon />
                                <AppleIcon />
                                <CheckBoxIcon />
                                <ArrowUpIcon />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>


                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '8px',
                                        justifyContent: 'space-between',
                                    }}>
                                    <GeneratorIcon />
                                    <TransportSparePartIcon />
                                    <BusinessManIcon />
                                    <HeartFilledIcon />
                                    <FurnitureIcon />
                                    <ClothesIcon />
                                    <SportsIcon />
                                    <CarIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '8px',
                                        justifyContent: 'space-between',
                                    }}>
                                    <HomeAndGardenIcon />
                                    <CalendarIcon />
                                    <ChildrenToyIcon />
                                    <PhoneIcon />
                                    <WorkIcon />
                                    <RealEstateAgentIcon />
                                    <CatIcon />
                                    <HandIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '8px',
                                        justifyContent: 'left',
                                        marginTop: '25px',
                                    }}>
                                    <BaselineFacebookIcon />
                                    <InstagramIcon />
                                    <TwitterIcon />
                                    <YoutubeIcon />
                                    <DownloadGooglePlay />
                                    <DownloadAppStore />
                                </Box>
                            </Box>
                        </Box>
                        <MaterialSymbolIcon />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        border: '2px solid black',
                        padding: '3px',
                        margin: '5px'
                    }}>
                    <Typography sx={{
                        fontSize: '10px'
                    }}>Label :</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        margin: '5px',
                    }}>
                        {/* 
                        Label має такі поля:
                            text: string;
                            type: 'primary'| 'head' | 'with-icon' | 'no-background';
                            icon?:React.ElementType<SvgIconProps>;
                    */}
                        <StyledLabel text='Primary Label' type='primary' textType='middle' textColor='var(--dark-blue)' />
                        <StyledLabel text='Head Label' type='head' textType='head' textColor='var(--light-blue)' />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '5px',
                            }}>
                            <StyledLabel text='TOP' type='status' textType='status' backgroundColor='var(--light-blue)' />
                            <StyledLabel text='VIP' type='status' textType='status' backgroundColor='var(--green)' />
                        </Box>
                        <StyledLabel text='Label with icon' type='with-icon' icon={LocationIcon} textType='small' />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        border: '2px solid black',
                        padding: '3px',
                        backgroundColor: 'lightgrey'
                    }}>
                    <Typography sx={{
                        fontSize: '10px',
                        color: 'black'
                    }}>Input :</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        {/* 
                        Input має такі поля:
                            label?: string;
                            value: string;
                            required?: boolean;
                            maxLength?: number;
                            isPassword?: boolean;
                            iconStart?: React.ElementType<SvgIconProps>;
                            iconEnd?: React.ElementType<SvgIconProps>;
                            iconStartClick?: () => void;
                            iconEndClick?: () => void;
                    */}
                        <StyledInput label='Пошта' widthType='middle' value='test@gmail.com' iconStart={Mail} />
                        <StyledInput label='Пароль' widthType='small' value='password' isPassword iconStart={Password} iconEnd={RemoveRedEye}
                            iconEndClick={
                                () => {
                                    console.log('Icon end clicked');
                                }
                            } />
                        <StyledInput value='Пошук' widthType='big' iconEnd={SearchOffRounded}
                            iconEndClick={
                                () => {
                                    console.log('Icon end clicked');
                                }
                            }
                        />
                        <StyledInput value='Продається фотоапарат...' widthType='big' label='Вкажіть назву' required maxLength={80} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '8px',
                        border: '2px solid black',
                        padding: '3px',
                        backgroundColor: 'lightgrey'
                    }}>
                    <Typography sx={{
                        fontSize: '10px',
                        color: 'black'
                    }}>Button :</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        {/* 
                        Button має такі поля:
                            text: string;
                            type: 'contained' | 'outlined';
                            className: string;
                            primaryColor?: string;
                            secondaryColor?: string;
                            hoverColor?: string;
                            disabled?: boolean;
                            icon?: React.ElementType<SvgIconProps>;
                            onClick?: () => void;
                    */}
                        <StyledButton text='Поповнити гаманець' type='contained' className='button-fit'
                            onClick={() => {
                                console.log('Button 1 clicked')
                            }} />
                        <StyledButton text='Додати оголошення' type='contained' icon={PlusIcon} primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' className='button-fit'
                            onClick={() => {
                                console.log('Button 2 clicked')
                            }} />
                        <StyledButton text='Пошук' type='contained' primaryColor='var(--dark-blue)' hoverColor='black' className='button-small'
                            onClick={() => {
                                console.log('Button 3 clicked')
                            }} />
                        <StyledButton text='Більше' type='outlined' className='button-medium'
                            onClick={() => {
                                console.log('Button 4 clicked')
                            }} />
                        <StyledButton text='Зареєструватися' type='contained' className='button-large'
                            onClick={() => {
                                console.log('Button 5 clicked')
                            }} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        border: '2px solid black',
                        padding: '3px',
                        backgroundColor: 'lightgrey'
                    }}>
                    <Typography sx={{
                        fontSize: '10px',
                        color: 'black'
                    }}>Text Area :</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        {/* 
                        TextArea має такі поля:
                            label: string;
                            value: string;
                            minRows?: number;
                            maxRows?: number;
                            maxLength?: number;
                            required?: boolean;
                    */}
                        <StyledTextArea label='Введіть опис' value='Будь ласка, введіть опис оголошення' required maxLength={9000} />
                        <StyledTextArea label='Введіть опис' value='Будь ласка, введіть опис оголошення' />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        border: '2px solid black',
                        padding: '3px',
                        backgroundColor: 'lightgrey'
                    }}>
                    <Typography sx={{
                        fontSize: '10px',
                        color: 'black'
                    }}>CheckBox :</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        {
                            // CheckBox має такі поля:
                            //     label: string;
                            //     checked?: boolean;
                            //     disabled?: boolean;
                            //     required?: boolean;
                            //     onChange?: () => void;
                        }
                        <StyledCheckBox label='Basic CheckBox' />
                        <StyledCheckBox label='Checked CheckBox' checked />
                        <StyledCheckBox label='Required CheckBox' required />
                        <StyledCheckBox label='Disabled CheckBox' disabled />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        border: '2px solid black',
                        padding: '3px',
                        backgroundColor: 'lightgrey'
                    }}>
                    <Typography sx={{
                        fontSize: '10px',
                        color: 'black'
                    }}>Icon :</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        {
                            // IconButton має такі поля:
                            //     icon: React.ElementType<SvgIconProps>;
                            //     checkedIcon?: React.ElementType<SvgIconProps>;
                            //     onClick?: () => void;
                            //     disabled?: boolean;
                        }
                        <StyledIconButton icon={PlusIcon} onClick={() => console.log('Hi')} />
                        <StyledIconButton icon={FavoriteBorderOutlined} checkedIcon={Favorite} />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: '2px solid black',
                    width: 'fit-content',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography fontSize='10px'>Image component</Typography>

                    {/*Image має такі поля:
                 src: string;
                alt: string;
                width?: string;
                height?: string;
                borderRadius?:string;
                onClick?: () =>void; */}
                    <ImageComponent src='https://5.imimg.com/data5/RV/NK/MY-45718396/ape-auto-501.png' alt='auto' width='150px' height='150px' />
                </Box>
                <Box sx={{
                    width: 'fit-content',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    border: '2px solid black',
                    padding: '10px',
                    margin: '10px 0px',
                }}>
                    <Typography fontSize='10px'>Dropdown:</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                    }}>
                        <StyledDropdown value='Виберіть категорію' values={["Hello", "World", "e11fd31"]} widthType='small' />
                        <StyledDropdown value='Виберіть категорію' values={["Hello", "World", "e11fd31"]} widthType='middle' />
                        <StyledDropdown value='Виберіть категорію' values={["Hello", "World", "e11fd31"]} widthType='big' />
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: 'lightgrey',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    border: '2px solid black',
                    width: 'fit-content',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Typography fontSize='10px'>Advert :</Typography>

                    {
                        // Advert має такі поля:
                        //     title: string;
                        //     location: string;
                        //     date: string;
                        //     image: string;
                        //     isVIP?: boolean;
                        //     isTOP?: boolean;
                        //     onClick: () => void;
                        //     onHeartClick?: () => void;
                        //     price: number;
                    }
                    <StyledAdvert title='Продам британських кошенят' image='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg' location='Рівне' date='27.06.2024' price={6000} onClick={
                        () => {
                            console.log('Advert clicked');
                        }
                    } />
                    <StyledAdvert title='Продам 3-кімнатну квартиру 98 м²' isVIP isTOP image='https://www.ownitkenya.com/wp-content/uploads/2023/05/apartment-for-sale-in-westland-nairobi.jpg' location='Хмельницьк' date='27.06.2024' price={4665859} onClick={
                        () => {
                            console.log('Advert clicked');
                        }
                    } />
                    <StyledAdvert title='Продам 3-кімнатну квартиру 98 м²' isVIP image='https://www.ownitkenya.com/wp-content/uploads/2023/05/apartment-for-sale-in-westland-nairobi.jpg' location='Хмельницьк' date='27.06.2024' price={4665859} onClick={
                        () => {
                            console.log('Advert clicked');
                        }
                    } />
                    <StyledAdvert title='Продам 3-кімнатну квартиру 98 м²' isTOP image='https://www.ownitkenya.com/wp-content/uploads/2023/05/apartment-for-sale-in-westland-nairobi.jpg' location='Хмельницьк' date='27.06.2024' price={4665859} onClick={
                        () => {
                            console.log('Advert clicked');
                        }
                    } />
                </Box>
            </Container>
        </StyledEngineProvider>
    )
}

export default ComponentsPreview;
