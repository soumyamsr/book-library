import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Loader } from "Components/Loader";
import { BooksAppState, BookData } from "client/src/store/types";
import {
  getBookListActionDB,
} from "../../store/actions";

import "./style.scss";
import BookTile from "Components/BookTile";

export interface BooksProps {
  bookList?: BookData[],
  getBookList(): void,
}

class HomePage extends React.PureComponent<BooksProps, any> {
  public componentDidMount() {
    if (!this.props.bookList.length) {
      this.props.getBookList();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className="book-list-header">Available Books: <span>{this.props.bookList ? this.props.bookList.length : '0'}</span></div>
        <section className="book-list-container">
          {
            this.props.bookList
            ? this.props.bookList.length
            ? this.props.bookList.map(book => <BookTile key={book.id} bookData={book} />)
            : <div className="no-books-found">No Books Found!</div>
            : <Loader />
          }
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: BooksAppState) => ({
  bookList: state.bookList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBookList: () => dispatch(getBookListActionDB()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
