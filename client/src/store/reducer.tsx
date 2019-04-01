import { BookData, ActionTypes, BooksAppState } from "./types";

interface Action {
  type: string;
  payload: any;
}

export default function CapstoneAppReducer(currState: BooksAppState, action: Action) {
  switch (action.type) {
    case ActionTypes.GET_BOOK_LIST:
      return {...currState, ...{bookList: action.payload}};
    case ActionTypes.CHANGE_CURRENT_BOOK:
      return {...currState, ...{currentBook: action.payload}};
    case ActionTypes.ADD_BOOK:
      return {...currState, ...{bookList: [...currState.bookList, action.payload]}};
    case ActionTypes.EDIT_BOOK:
      return {...currState, ...{currentBook: {...currState.currentBook, ...action.payload.bookData}}}
    case ActionTypes.DELETE_BOOK:
      return deleteBook(currState, action);
    default:
      return currState;
  }
}

function deleteBook(currState: BooksAppState, {type, payload}: Action) {
  if (type === ActionTypes.DELETE_BOOK) {
      const newBooks = currState.bookList.filter((book) => book.id !== payload.bookId);
      return {...currState, bookList: newBooks};
  }
  return currState;
}
