import * as React from "react";
import { HeaderProps } from "./Header.props";
import { HeaderState } from "./Header.state";
import { Link } from 'react-router-dom';
import "./Header.scss";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { BooksAppState, BookData } from "../../store/types";
import {
  addBookActionDB,
} from "../../store/actions";
import BookModal from "Components/BookModal";

class Header extends React.PureComponent<HeaderProps, HeaderState> {
	state = {
    openMenu: false,
    openModal: false,
    inputTextVal: '',
  };

	toggleMenu() {
    this.setState({ openMenu: !this.state.openMenu });
  };

  searchBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TO DO
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputTextVal: event.target.value,
    });
  }

  openModal() {
    this.setState({
      openModal: true,
    })
  }

  closeModal() {
    this.setState({
      openModal: false,
    })
  }

  addNewBook(bookData: BookData) {
    this.props.addNewBook(bookData);
  }

	public render() {
    const open = this.state.openMenu;

		return (
      <React.Fragment>
      {
        this.state.openModal
        ? <BookModal
          title="Add Book Form"
          closeModal={this.closeModal.bind(this)}
          submitForm={this.addNewBook.bind(this)} />
        : ''
      }
			<header className="header-container">
        <section className="main-header">
          <a href="javascript:void(0);" className="hamburger-menu" onClick={this.toggleMenu.bind(this)}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </a>
          <Link to={{pathname: "/"}} className="header-title">{this.props.title}</Link>
        </section>
        <section className={open ? "sub-header show" : "sub-header"}>
          <div className="search-box">
            <form className="search-form" onSubmit={this.searchBook.bind(this)}>
              <input type="text" autoFocus
              placeholder="Search Book Name"
              name="bookSearch" id="bookSearch"
              value={this.state.inputTextVal}
              onChange={this.handleInputChange.bind(this)}
              className="search-input"/>
              <button className="search-btn" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <div className="header-actions">
            <a href="javascript:void(0);" className="btn tertiary add-book"
            onClick={this.openModal.bind(this)}>Add Book</a>
          </div>
        </section>
			</header>
      </React.Fragment>
		);
	}
}

const mapStateToProps = (state: BooksAppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNewBook: (bookData: BookData) => dispatch(addBookActionDB(bookData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
