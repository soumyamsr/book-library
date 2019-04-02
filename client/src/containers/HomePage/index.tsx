import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Loader } from "Components/Loader";
import Header from "Components/Header";
import { BooksAppState, BookData } from "client/src/store/types";
import {
  getBookListActionDB,
} from "../../store/actions";

import "./style.scss";
import BookTile from "Components/BookTile";

export interface BooksProps {
  bookList?: BookData[],
  currentBook?: BookData,
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
        <Header title="Book Library" bookList={this.props.bookList} />
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
  bookList: state.bookList,
  currentBook: state.currentBook,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBookList: () => dispatch(getBookListActionDB()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
