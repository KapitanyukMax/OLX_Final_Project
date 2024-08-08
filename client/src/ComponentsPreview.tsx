import StyledLabel from './components/label';
import StyledButton from './components/button';
import StyledIcon from './components/icon';
import { Container, Box, Typography } from '@mui/material';
import { StyledInput } from './components/input';
import { Mail, RemoveRedEye, Password, Home, Favorite, Chat, SearchOffRounded } from '@mui/icons-material';
import { StyledCheckBox } from './components/checkBox';
import { StyledTextArea } from './components/textArea';
import ImageComponent from './components/image';
import ArrowDown from './components/icons/arrowDown';
import Search from './components/icons/search';
import StyledLabel1 from './components/lebak';

const ComponentsPreview = () => {
    return (
        <Container
            sx={{
                display: 'block',
                position: 'sticky',
                minWidth: '100vw',
                minHeight: '100vh'
            }}>
            <Typography variant="h3">Components Preview</Typography>
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
                    <StyledLabel text='Primary Label for display info' type='primary' textColor='white' />
                    <StyledLabel text='Head Label for display info' type='head' textColor='white' />
                    <StyledLabel text='Label with no background' type='no-background' />
                    <StyledLabel text='Label with icon for display info' type='with-icon' icon={Home} />
                </Box>
                <Box>
                    <StyledLabel1 text='Primary Label for display info' type='primary' textType='small' />
                    <StyledLabel1 text='Head Label for display info' type='head' textType='middle' />
                    <StyledLabel1 text='Label with no background' type='no-background' textType='big' />
                    <StyledLabel1 text='Label with icon for display info' type='with-icon' icon={Home} textType='middle' />
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
                            primaryColor?: string;
                            secondaryColor?: string;
                            hoverColor?: string;
                            disabled?: boolean;
                            icon?: React.ElementType<SvgIconProps>;
                            onClick?: () => void;
                    */}
                    <StyledButton text='Home' type='outlined' icon={Home}
                        onClick={() => {
                            console.log('Button clicked')
                        }} data-theme='base' />
                    <StyledButton text='Home' type='contained' />
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
                        // Icon має такі поля:
                        //     icon: React.ElementType<SvgIconProps>;
                        //     type?: 'default' | 'button';
                        //     color?: string;
                        //     hoverColor?: string;
                        //     onClick?: () => void;
                        //     disabled?: boolean;
                    }
                    <StyledIcon icon={Home} />
                    <StyledIcon icon={Favorite} type='button' color='#f73378' hoverColor='#f50057' onClick={() => {
                        console.log('Liked');
                    }} />
                    <StyledIcon icon={Chat} type='button' color='#2196f3' disabled />
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
            <Box>
                <Typography variant='h5'>Icons</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'green',
                }}
                >
                    <ArrowDown />
                    <Search />
                </Box>

            </Box>
        </Container>
    )
}

export default ComponentsPreview;
