import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Loader } from "Components/Loader";
import { BooksAppState, BookData } from "client/src/store/types";
import {
  getBookActionDB,
  changeCurrentBookAction,
  deleteBookActionDB,
  editBookActionDB,
} from "../../store/actions";

import "./style.scss";
import BookDetail from "Components/BookDetail";
import BookModal from "Components/BookModal";

export interface BooksProps {
  currentBook?: BookData,
  getBookDetail(bookId: string): void,
  resetCurrentBook(): void,
  editBook(bookId: string, bookData: BookData): void,
  deleteBook(bookId: string): void,
  match: any,
  history: any,
}

export interface BooksState {
  bookId: string;
  openModal: boolean;
}

class DetailPage extends React.PureComponent<BooksProps, BooksState> {
  state = {
    bookId: this.props.match.params.bookId,
    openModal: false,
  }

  public componentWillMount() {
    this.props.resetCurrentBook();
  }

  public componentDidMount() {
    this.props.getBookDetail(this.state.bookId);
  }

  public toggleEditModal() {
    this.setState({
      openModal: !this.state.openModal,
    })
  }

  public deleteBook(bookId: string) {
    this.props.deleteBook(bookId);
    this.props.history.goBack();
  }

  public editBook(bookData: BookData) {
    this.props.editBook(bookData.id, bookData);
  }

  public render() {
    const { currentBook } = this.props;
    return (
      <React.Fragment>
        {
          this.state.openModal
          ? <BookModal 
            bookData={currentBook} 
            title="Edit Book Form"
            closeModal={this.toggleEditModal.bind(this)} 
            submitForm={this.editBook.bind(this)} />
          : ''
        }
        <section className="book-detail-container">
          {
            currentBook.id === this.state.bookId
            ? <BookDetail editBook={this.toggleEditModal.bind(this)} deleteBook={this.deleteBook.bind(this)} bookData={currentBook} />
            : <Loader />
          }
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: BooksAppState) => ({
  currentBook: state.currentBook,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBookDetail: (bookId: string) => dispatch(getBookActionDB(bookId)),
  resetCurrentBook: () => dispatch(changeCurrentBookAction({})),
  editBook: (bookId: string, bookData: BookData) => dispatch(editBookActionDB(bookId, bookData)),
  deleteBook: (bookId: string) => dispatch(deleteBookActionDB(bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
