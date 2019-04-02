import { BookData } from 'client/src/store/types';
export interface HeaderProps {
    title: string;
    bookList: BookData[],
    addNewBook(bookData: BookData): void;
}
