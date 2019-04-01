import { applyMiddleware, createStore, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import AppReducer from "./reducer";
import sagas from "./saga";
import { BooksAppState } from "./types";

const initialState: BooksAppState = {
    currentBook: {},
    bookList: [],
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore((AppReducer as Reducer<BooksAppState>), initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
export default store;
