import { BookData } from 'client/src/store/types';
export interface BookModalProps {
    title: string,
    bookData?: BookData;
    submitForm(bookData: BookData): void;
    closeModal(): void;
}
