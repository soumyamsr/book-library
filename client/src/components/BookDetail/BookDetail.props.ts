import { BookData } from '../../store/types';

export interface BookDetailProps {
  bookData: BookData;
  deleteBook(bookId: string): void;
  editBook(): void;
}