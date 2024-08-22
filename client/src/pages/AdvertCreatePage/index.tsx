import React from 'react';
import { Header } from '../../components/header';
import { StyledEngineProvider, Box } from '@mui/material';
import StyledFooter from '../../components/footer';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import { StyledDropdown } from '../../components/dropdown';
import { StyledCheckBox } from '../../components/checkBox';
import StyledButton from '../../components/button';
import { StyledTextArea } from '../../components/textArea';
import './styles.css';
import ImageComponent from '../../components/image';

const AdvertCreatePage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
    };

    return (
        <StyledEngineProvider injectFirst>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                backgroundColor: '#ebeef5',
            }}>
                <form className='form' onSubmit={handleSubmit}>
                    <Box sx={{
                        margin: '60px',
                    }}>
                        <StyledLabel text="Створити оголошення" type='head' textType='head' textColor='var(--blue)' />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '65px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                        paddingBottom: '30px',
                    }}>
                        <Box>
                            <StyledLabel text="Заголовок" type='head' textType='head' textColor='black' />
                            <StyledInput value='Продається фотоапарат Nikon d90' label='Вкажіть назву' required widthType='large' maxLength={80} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>
                            <StyledLabel text="Категорія" type='head' textType='head' textColor='black' />
                            <StyledLabel text="Вкажіть категорію*" type='primary' textType='small' textColor='black' />
                            <StyledDropdown value='Оберіть категорію' type='large' values={['Категорія 1', 'Категорія 2', 'Категорія 3']} />
                            <StyledDropdown value='Рубрика категорії' type='large' values={['Рубрика 1', 'Рубрика 2', 'Рубрика 3']} />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Місцезнаходження" type='head' textType='head' textColor='black' />
                        <StyledLabel text="Оберіть назву населеного пункту*" type='primary' textType='small' textColor='black' />
                        <StyledDropdown value='Оберіть місто' type='large' values={['Місто 1', 'Місто 2', 'Місто 3']} />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '65px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}>
                            <StyledLabel text="Вид угоди" type='head' textType='head' textColor='black' />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '592px',
                                gap: '80px',
                                flexWrap: 'wrap',
                            }}>
                                <StyledCheckBox label='Продам' />
                                <StyledCheckBox label='Здам в оренду' />
                                <StyledCheckBox label='Безкоштовно' />
                                <StyledCheckBox label='Куплю' />
                                <StyledCheckBox label='Орендую' />
                                <StyledCheckBox label='Обміняю' />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}>
                            <StyledLabel text="Стан" type='head' textType='head' textColor='black' />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '80px',
                            }}>
                                <StyledCheckBox label='Нове' />
                                <StyledCheckBox label='Вживане' />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Ціна" type='head' textType='head' textColor='black' />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '36px',
                            alignItems: 'end',
                        }}>
                            <StyledInput label='Вкажіть ціну' value='1080 грн' widthType='middle' />
                            <StyledDropdown value='Валюта' values={["UAH", "USD", "EUR"]} type='middle' />
                            <StyledCheckBox label='Договірна' />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Фото" type='head' textType='head' textColor='black' />
                        <StyledLabel text="Додайте фото*" type='primary' textType='small' textColor='black' />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: '24px',
                            width: '750px',
                            flexWrap: 'wrap',
                            alignItems: 'end',
                        }}>
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                            <StyledButton text='Додати фото' type='contained' primaryColor='var(--green)' secondaryColor='black' hoverBackColor='var(--light-blue)' />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '812px',
                        }}>
                            <StyledButton text='Завантажити більше фотографій' type='outlined' primaryColor='black' hoverBackColor='var(--light-blue)' />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Опис оголошення" type='head' textType='head' textColor='black' />
                        <StyledTextArea label='Введіть опис' required value='Будь ласка, введіть опис оголошення' maxLength={9000} minRows={18} />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                        marginBottom: '120px',
                    }}>
                        <StyledLabel text="Ваші контактні дані" type='head' textType='head' textColor='black' />
                        <StyledInput label="Ваше ім'я" value='Вікторія' widthType='large' />
                        <StyledInput label="Електронна адреса" value='vikka3467@gmail.com' widthType='large' />
                        <StyledInput label="Номер телефону" value='+38 097 558 6548' widthType='large' />
                        <StyledButton text='Додати оголошення' type='contained' primaryColor='var(--light-blue)' secondaryColor='white' hoverBackColor='var(--green)' />
                    </Box>
                </form>
            </Box>
            <StyledFooter />
        </StyledEngineProvider >
    );
};

export {
    AdvertCreatePage,
}