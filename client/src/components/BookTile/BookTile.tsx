import * as React from "react";
import { Link } from 'react-router-dom';
import { BookTileProps } from './BookTile.props';
import "./BookTile.scss";

const BookTile = (props: BookTileProps) => (
  <article className="book-tile">
    <Link to={{pathname: `/books/${props.bookData.id}`}} className="book-tile-link">
      <img src={props.bookData.picture} alt={props.bookData.name} />
    </Link>
    <div className="book-detail">
      <div className="book-name">{props.bookData.name}</div>
      <div className="book-author"><span className="bold">By: </span>{props.bookData.author}</div>
    </div>
  </article>
);

export default BookTile;
