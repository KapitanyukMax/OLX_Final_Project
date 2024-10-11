import axios from 'axios';

const fetchAdverts = (categoryId: string = '', search: string = '', limit?: number,
    startAfter: string | null = null, subcategories: string[] = [], fromPrice: number = 0,
    toPrice?: number, stateParams: string = '', sortParams: string = '',
    currency: string = '', isVip: boolean = false, isTop: boolean = false) => {
    const host = import.meta.env.VITE_HOST;

    const searchParams = search.length > 0 ? `searchTerm=${search}&` : '';
    const limitParams = limit ? `limit=${limit}&` : '';
    const subcategoriesParams = subcategories.map(value => `subcategoryIds[]=${value}&`).join();
    const priceParams = `priceLow=${fromPrice}&` + (toPrice ? `priceHigh=${toPrice}&` : '');
    const currencyParams = currency.length > 0 ? `currency=${currency}&` : '';

    if (categoryId.length > 0) {
        return axios.get(`${host}/adverts/categoryId?categoryId=${categoryId}&${searchParams}${limitParams}startAfter=${startAfter}&${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}isVip=${isVip}&isTop=${isTop}`);
    }

    if (isTop && !isVip) {
        return axios.get(`${host}/adverts/vip?${searchParams}${limitParams}startAfter=${startAfter}&${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
    }

    if (isVip && !isTop) {
        return axios.get(`${host}/adverts/top?${searchParams}${limitParams}startAfter=${startAfter}&${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
    }
    
    return axios.get(`${host}/adverts?${searchParams}${limitParams}startAfter=${startAfter}&${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
};

export {
    fetchAdverts
};
