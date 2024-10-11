import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StyledInput } from '../input';
import StyledButton from '../button';
import { Box } from '@mui/material';
import './styles.css';

interface SearchProps {
    value?: string,
    onSearchTermChange?: (searchTerm: string) => void,
    onSearch: (searchTerm: string) => void
}

const Search: React.FC<SearchProps> = ({ value, onSearch, onSearchTermChange }) => {
    const StyledSearchIcon: React.FC = () => (
        <SearchIcon sx={{ color: "black" }} />
    );

    const [searchTerm, setSearchTerm] = useState(value ?? '');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '60px',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '522px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left'
            }}>
                <StyledInput value={searchTerm} placeholder='Що шукаємо'
                iconEnd={StyledSearchIcon} width='100%'
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        onSearchTermChange?.(e.target.value);
                    }} />
            </Box>
            <StyledInput value='Вся Україна' iconEnd={StyledSearchIcon} width="254px" />
            <StyledInput value='Місто/село' iconEnd={StyledSearchIcon} width="254px" />
            <StyledButton text='Пошук' type='contained' primaryColor='var(--dark-blue)' hoverColor='black' className='button-small' onClick={() => onSearch(searchTerm)} />
        </Box>
    );
};

export {
    Search
};
