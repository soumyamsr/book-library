import * as React from "react";
import { v4 as uuid } from "uuid";
import { BookModalProps } from "./BookModal.props";
import { BookModalState } from "./BookModal.state";
import "./BookModal.scss";

import { BookData } from "../../store/types";

class BookModal extends React.PureComponent<BookModalProps, BookModalState> {
	state = {
    name: this.props.bookData ? this.props.bookData.name : '',
    author: this.props.bookData ? this.props.bookData.author : '',
    pages: this.props.bookData ? this.props.bookData.pages : 0,
    price: this.props.bookData ? this.props.bookData.price.substring(1) : '0',
    picture: this.props.bookData ? this.props.bookData.picture : '',
    genre: this.props.bookData ? this.props.bookData.genre : '',
    publication: this.props.bookData ? this.props.bookData.publication : '',
    publishedDate: this.props.bookData ? this.props.bookData.publishedDate.toString() : undefined,
    description: this.props.bookData ? this.props.bookData.description : '',
  };

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

	submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const picture = this.state.picture.trim() || 'https://placehold.it/200x250';
    const price = '$' + this.state.price;
    const publishedDate = this.formatDate(this.state.publishedDate);
    const bookData:BookData = this.props.bookData
    ? {...this.state, publishedDate, picture, price, id: this.props.bookData.id}
    : {...this.state, publishedDate, picture, price, id: uuid()};
    this.props.submitForm(bookData);
    this.props.closeModal();
  }

  inputTextHandler(event: React.ChangeEvent<HTMLInputElement>, stateProp) {
    this.setState({
      [stateProp]: event.target.value,
    });
  }

  inputNumberHandler(event: React.ChangeEvent<HTMLInputElement>, stateProp) {
    this.setState({
      [stateProp]: Number(event.target.value),
    });
  }

	public render() {

		return (
			<section className="book-modal-container">
        <div className="book-modal">
          <div className="modal-header">{this.props.title}</div>
          <form className="modal-form" onSubmit={this.submitForm.bind(this)}>
            <input type="text"
            required
            placeholder="Book Name"
            name="bookName" id="bookName"
            value={this.state.name}
            onChange={(e) => this.inputTextHandler(e, 'name')}
            className="book-name-input"/>

            <input type="text"
            required
            placeholder="Author Name"
            name="authorName" id="authorName"
            value={this.state.author}
            onChange={(e) => this.inputTextHandler(e, 'author')}
            className="author-name-input"/>

            <input type="text"
            required
            placeholder="Genre"
            name="genre" id="genre"
            value={this.state.genre}
            onChange={(e) => this.inputTextHandler(e, 'genre')}
            className="genre-input"/>

            <input type="text"
            placeholder="Image Path for Book Cover"
            name="bookCover" id="bookCover"
            value={this.state.picture}
            onChange={(e) => this.inputTextHandler(e, 'picture')}
            className="picture-input"/>  

            <input type="text"
            required
            placeholder="Publication Name"
            name="publication" id="publication"
            value={this.state.publication}
            onChange={(e) => this.inputTextHandler(e, 'publication')}
            className="publication-input"/>

            <div className="label">Pages:</div>
            <input type="number"
            required
            name="pages" id="pages"
            value={this.state.pages}
            onChange={(e) => this.inputNumberHandler(e, 'pages')}
            className="pages-input"/> 

            <div className="label">Price:</div>
            <input type="number"
            required
            name="price" id="price"
            value={Number(this.state.price)}
            onChange={(e) => this.inputNumberHandler(e, 'price')}
            className="price-input"/> 

            <div className="label">Published On:</div>
            <input type="date"
            required
            name="publishedDate" id="publishedDate"
            value={this.state.publishedDate}
            onChange={(e) => this.inputTextHandler(e, 'publishedDate')}
            className="published-date-input"/> 

            <input type="text"
            required
            placeholder="Book Description"
            name="description" id="description"
            value={this.state.description}
            onChange={(e) => this.inputTextHandler(e, 'description')}
            className="description-input"/> 

            <div className="button-wrapper">
              <button className="btn primary" type="submit">
                SUBMIT
              </button>
              <button className="btn tertiary" onClick={this.props.closeModal.bind(this)}>
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </section>
		);
	}
}

export default BookModal;
