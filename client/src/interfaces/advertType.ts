interface advertType {
    id: string;
    name: string;
    description: string;
    price: number;
    currencyId: string;
    status: string;
    orderType: string;
    creationDate: string;
    userId: string;
    subCategoryId: string;
    pictures: string[];
    location: string;
    delivery: string;
    isHidden: boolean;
    vipUntil?: string;
    viewsCount: number;
    favoritesCount: string;
}

export type {
    advertType
};
