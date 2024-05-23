interface IItemsPerPage {
    categories: number,
    books: number,
    orders: number,
    authors: number,
    reviews: number,
}

export const ItemsPerPage: IItemsPerPage = {
    categories: 3,
    books: 2,
    orders: 10,
    authors: 10,
    reviews: 10,
};
