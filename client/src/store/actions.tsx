import { action } from 'typesafe-actions';
import { ActionTypes, BookData } from './types';

export const getBookListActionDB = () => action(ActionTypes.GET_BOOK_LIST_DB);
export const getBookListAction = (boardList: BookData[]) => action(ActionTypes.GET_BOOK_LIST, boardList);
export const changeCurrentBookAction = (bookData: BookData | {}) => action(ActionTypes.CHANGE_CURRENT_BOOK, bookData);
export const getBookActionDB = (bookId: string) => action(ActionTypes.GET_BOOK_DB, bookId);
export const getBookAction = (bookId: string) => action(ActionTypes.GET_BOOK, {bookId});
export const addBookActionDB = (bookData: BookData) => action(ActionTypes.ADD_BOOK_DB, {...bookData});
export const addBookAction = (bookData: BookData) => action(ActionTypes.ADD_BOOK, {...bookData});
export const editBookActionDB = (bookId: string, bookData: BookData) => action(ActionTypes.EDIT_BOOK_DB, {bookId, bookData});
export const editBookAction = (bookId: string, bookData: BookData) => action(ActionTypes.EDIT_BOOK, {bookId, bookData});
export const deleteBookActionDB = (bookId: string) => action(ActionTypes.DELETE_BOOK_DB, {bookId});
export const deleteBookAction = (bookId: string) => action(ActionTypes.DELETE_BOOK, {bookId});
