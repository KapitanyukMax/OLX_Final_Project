import axios from 'axios';

const fetchAdverts = (categoryId: string = '', search: string = '', limit?: number,
    subcategories: string[] = [], fromPrice: number = 0, toPrice?: number,
    stateParams: string = '', sortParams: string = '', currency: string = '') => {
    const host = import.meta.env.VITE_HOST;

    const categoryParams = categoryId.length > 0 ? `/categoryId?categoryId=${categoryId}&` : '?';
    const searchParams = search.length > 0 ? `searchTerm=${search}&` : '';
    const limitParams = limit ? `limit=${limit}&` : '';
    const subcategoriesParams = subcategories.map(value => `subcategoryIds[]=${value}&`).join();
    const priceParams = `priceLow=${fromPrice}&` + (toPrice ? `priceHigh=${toPrice}&` : '');
    const currencyParams = currency.length > 0 ? `currency=${currency}` : '';

    return axios.get(`${host}/adverts${categoryParams}${searchParams}${limitParams}${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
};

export {
    fetchAdverts
};
