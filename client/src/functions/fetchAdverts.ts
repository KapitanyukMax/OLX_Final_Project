import axios from 'axios';
import { advertType } from '../interfaces/advertType';

interface fetchAdvertsParams {
    categoryId?: string,
    search?: string,
    limit?: number,
    startAfter: string | null,
    city?: string,
    subcategories?: string[],
    fromPrice?: number,
    toPrice?: number,
    stateParams?: string,
    sortParams?: string,
    currency?: string,
    isVip?: boolean,
    isTop?: boolean
}

const fetchAdverts: (params: fetchAdvertsParams) =>
    Promise<{ data: { adverts: advertType[], totalCount: number }, status: number }> = (
    { categoryId = '', search = '', limit, startAfter = null, city = '',
        subcategories = [], fromPrice = 0, toPrice, stateParams = '',
        sortParams = '', currency = '', isVip = false, isTop = false }) => {
    const host = import.meta.env.VITE_HOST;

    const searchParams = search.length > 0 ? `searchTerm=${search}&` : '';
    const limitParams = limit ? `limit=${limit}&` : '';
    const cityParams = city ? `city=${city}&` : '';
    const subcategoriesParams = subcategories.map(value => `subcategoryIds[]=${value}&`).join();
    const priceParams = `priceLow=${fromPrice}&` + (toPrice ? `priceHigh=${toPrice}&` : '');
    const currencyParams = currency.length > 0 ? `currency=${currency}&` : '';

    if (categoryId.length > 0) {
        return axios.get(`${host}/adverts/categoryId?categoryId=${categoryId}&${searchParams}${limitParams}startAfter=${startAfter}&${cityParams}${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}isVip=${isVip}&isTop=${isTop}`);
    }

    if (isTop && !isVip) {
        return axios.get(`${host}/adverts/vip?${searchParams}${limitParams}startAfter=${startAfter}&${cityParams}${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
    }

    if (isVip && !isTop) {
        return axios.get(`${host}/adverts/top?${searchParams}${limitParams}startAfter=${startAfter}&${cityParams}${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
    }

    return axios.get(`${host}/adverts?${searchParams}${limitParams}startAfter=${startAfter}&${cityParams}${subcategoriesParams}${stateParams}${sortParams}${priceParams}${currencyParams}`);
};

export {
    fetchAdverts
};
