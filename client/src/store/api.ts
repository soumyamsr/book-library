import axios from "axios";
import { BookData } from "./types";

export function getBookList() {
	return axios.get("/api/books")
		.then(
            (res: any) => Promise.resolve(res.data),
            (error) => Promise.resolve([])
        );
}

export function getBook(bookId: string) {
	return axios.get(`/api/books/${bookId}`)
		.then(
            (res: any) => Promise.resolve(res.data),
            (error) => Promise.resolve(error)
        );
}

export function createBook(bookData: BookData) {
	return axios.post("/api/books", bookData)
		.then(
            (res: any) => Promise.resolve(res.data),
            (error) => Promise.resolve(error)
        );
}

export function removeBook(bookId: string) {
	return axios.delete(`/api/books/${bookId}`)
		.then(
            (res: any) => Promise.resolve(res.data),
            (error) => Promise.resolve(error)
        );
}

export function updateBook({ bookId, bookData }) {
	return axios.put(`/api/books/${bookId}`, bookData)
        .then(
            (res: any) => Promise.resolve(res.data),
            (error) => Promise.resolve(error)
        );
}
