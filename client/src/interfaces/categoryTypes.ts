interface categoryType {
    id: string;
    name: string;
    picture: string;
    subcategories: string[];
}

interface subcategoryType {
    id: string;
    name: string;
    picture?: string;
}

export type {
    categoryType, subcategoryType
};
