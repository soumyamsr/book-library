import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionTypes, BookData } from './types';
import { AnyAction } from 'redux';
import {
    getBookList,
    getBook,
    createBook,
    updateBook,
    removeBook,
} from './api';
import {
    getBookListAction,
    getBookAction,
    changeCurrentBookAction,
    addBookAction,
    editBookAction,
    deleteBookAction
} from './actions';

function* retrieveBookList(action: AnyAction) {
    const bookList: BookData[] = yield call(getBookList);
    yield put(getBookListAction(bookList));
}

function* retrieveBook(action: AnyAction) {
    const currentBook: BookData = yield call(getBook, action.payload);
    if (currentBook.id) 
        yield put(changeCurrentBookAction(currentBook));
    else 
        yield put(changeCurrentBookAction({}));
}

function* editBook(action: AnyAction) {
    const editedBook = yield call(updateBook, action.payload);
    if (editedBook.id) yield put(editBookAction(editedBook.id, editedBook));
}

function* deleteBook(action: AnyAction) {
    const deletedBook = yield call(removeBook, action.payload.bookId);
    yield put(deleteBookAction(action.payload.bookId));
}

function* addBook(action: AnyAction) {
    const createdBook = yield call(createBook, action.payload);
    if (createdBook.id) yield put(addBookAction(createdBook));
}

export default function* saga() {
    yield takeLatest(ActionTypes.GET_BOOK_LIST_DB, retrieveBookList);
    yield takeLatest(ActionTypes.GET_BOOK_DB, retrieveBook);
    yield takeLatest(ActionTypes.EDIT_BOOK_DB, editBook);
    yield takeLatest(ActionTypes.DELETE_BOOK_DB, deleteBook);
    yield takeLatest(ActionTypes.ADD_BOOK_DB, addBook);
}
