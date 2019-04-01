import * as React from "react";
import { Link } from 'react-router-dom';
import { BookDetailProps } from './BookDetail.props';
import "./BookDetail.scss";

const BookDetail = (props: BookDetailProps) => (
  <section className="book-detail">
    <article className="book-detail-header">
      <div className="book-cover">
        <img src={props.bookData.picture} alt={props.bookData.name} />
      </div>     
      <div className="book-info">
        <div className="book-info-data">
          <div className="book-name">{props.bookData.name}</div>
          <div className="book-metadata">
            <div className="genre"><span className="bold">Genre: </span>{props.bookData.genre}</div>
            <div className="author"><span className="bold">Author: </span>{props.bookData.author}</div>
          </div>
          <div className="publication-info">
            <div className="pub-name"><span className="bold">Publication: </span>{props.bookData.publication}</div>
            <div className="pub-date"><span className="bold">Published on: </span>{props.bookData.publishedDate}</div>
            <div className="pages"><span className="bold">Price: </span>{props.bookData.price}</div>
            <div className="price"><span className="bold">Pages: </span>{props.bookData.pages}</div>
          </div>
        </div>
        <div className="action-block">
          <a href="javascript:void(0);" onClick={() => props.deleteBook(props.bookData.id)} className="action-link delete-book">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </a>
          <a href="javascript:void(0);" onClick={() => props.editBook()} className="action-link edit-book">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>
    <article className="book-description-block">
      <div className="bold article-header">Description</div>
      <div className="book-description">{props.bookData.description}</div>
    </article>
  </section>
);

export default BookDetail;
