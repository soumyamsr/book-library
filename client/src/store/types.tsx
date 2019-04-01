export enum ActionTypes {
  CHANGE_CURRENT_BOOK = '@@types/CHANGE_CURRENT_BOOK',
  GET_BOOK_LIST = '@@types/GET_BOOK_LIST',
  GET_BOOK_LIST_DB = '@@types/GET_BOOK_LIST_DB',
  GET_BOOK = '@@types/GET_BOOK',
  GET_BOOK_DB = '@@types/GET_BOOK_DB',
  ADD_BOOK = '@@types/ADD_BOOK',
  ADD_BOOK_DB = '@@types/ADD_BOOK_DB',
  EDIT_BOOK = '@@types/EDIT_BOOK',
  EDIT_BOOK_DB = '@@types/EDIT_BOOK_DB',
  DELETE_BOOK = '@@types/DELETE_BOOK',
  DELETE_BOOK_DB = '@@types/DELETE_BOOK_DB',
}

export interface BookData {
  id?: string;
  name: string;
  author: string;
  pages: number;
  price: string;
  picture?: string;
  genre: string;
  publication: string;
  publishedDate: string;
  description: string;
}

export interface BooksAppState {
  currentBook?: BookData | any;
  bookList?: BookData[];
}
