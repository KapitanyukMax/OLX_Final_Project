import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StyledInput } from '../input';
import StyledButton from '../button';
import { Box } from '@mui/material';
import './styles.css';
import axios from 'axios';
import { StyledDropdown } from '../dropdown';

interface SearchProps {
    value?: string,
    city?: string,
    onSearchTermChange?: (searchTerm: string, city: string) => void,
    onSearch: (searchTerm: string, city: string) => void
}

const Search: React.FC<SearchProps> = ({ value, city: initialCity, onSearch, onSearchTermChange }) => {
    const StyledSearchIcon: React.FC = () => (
        <SearchIcon sx={{ color: "black" }} />
    );

    const [searchTerm, setSearchTerm] = useState(value ?? '');
    const [city, setCity] = useState<string>(initialCity ?? '');
    const [cities, setCities] = useState<string[]>([]);

    const host = import.meta.env.VITE_HOST;

    const fetchCities = async (value: string) => {
        try {
            const response = await axios.post(`${host}/cities`, {
                apiKey: '15d0f1b8de9dc0f5370abcf1906f03cd',
                modelName: "AddressGeneral",
                calledMethod: "getSettlements",
                methodProperties: {
                    FindByString: value
                }
            });
            const cities: string[] = response.data.data.map((city: { Description: string }) => city.Description);
            setCities([...new Set(cities)]);
        } catch (error) {
            console.error('Error fetching cities', error);
        }
    };

    useEffect(() => {
        setSearchTerm(value ?? '');
    }, [value]);

    useEffect(() => {
        setCity(initialCity ?? '');
    }, [initialCity]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: '60px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                width: '522px',
                flexGrow: 1
            }}>
                <StyledInput value={searchTerm} placeholder='Що шукаємо'
                    iconEnd={StyledSearchIcon} width='100%'
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        onSearchTermChange?.(e.target.value, city);
                    }} />
            </Box>

            <Box sx={{
                flexGrow: 1
            }}>
                <StyledDropdown placeholder="Оберіть місто" type='middle' values={cities} onInput={(e) => {
                    const value = e.target.value;
                    fetchCities(value);
                }} onChange={(e) => setCity(e.target.value)} />
            </Box>

            <StyledButton text='Пошук' type='contained' primaryColor='var(--dark-blue)' hoverColor='black' className='button-small' onClick={() => onSearch(searchTerm, city)} />
        </Box>
    );
};

export {
    Search
};
