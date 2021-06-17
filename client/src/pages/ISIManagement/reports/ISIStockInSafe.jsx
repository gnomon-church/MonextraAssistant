import React, { useState, useEffect } from 'react';
import { Button, Navbar, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function PDFReport() {
	let history = useHistory();

	const [safeBooks, setSafeBooks] = useState([]);
	const [bookDetails, setBookDetails] = useState([]);

	useEffect(() => {
		document.title = 'Stock in Safe - Mona';
		fetchData();
	}, []);

	// Get data from the API and set it
	function fetchData() {
		axios
			.get('/api/isi-books-download')
			.then((res) => res.data.rows)
			.then((rows) =>
				rows.map((book) => {
					return {
						game_id: book.game_id,
						book_number: book.book_number,
					};
				})
			)
			.then((books) => {
				let bookObject = {};
				for (let i = 0; i < books.length; i++) {
					if (books[i].game_id in bookObject) {
						bookObject[books[i].game_id].push(books[i].book_number);
					} else {
						bookObject[books[i].game_id] = [books[i].book_number];
					}
				}
				let bookArray = [];
				for (const [key, value] of Object.entries(bookObject)) {
					bookArray.push([key, value]);
				}
				setSafeBooks(bookArray);
			});
	}

	const DisplayBooks = () => {
		for (let i = 0; i < safeBooks.length; i++) {
			axios
				.get('/api/isi-game-details/' + safeBooks[i][0])
				.then((res) => res.data.rows)
				.then((rows) =>
					rows.map((book) => {
						return {
							ticket_value: book.ticket_value,
							ticket_name: book.ticket_name,
						};
					})
				)
				.then((details) => {
					// let detailArray = bookDetails;
					// detailArray.push(details[0]);
					// setBookDetails(detailArray);
					setBookDetails(bookDetails.concat(details[0]));
				});
		}

		console.log(safeBooks);
		console.log(bookDetails);

		return null;

		// return Object.keys(safeBooks).map((key) => {
		// 	axios
		// 		.get('/api/isi-game-details/' + key)
		// 		.then((res) => res.data.rows)
		// 		.then((rows) =>
		// 			rows.map((book) => {
		// 				return {
		// 					ticket_value: book.ticket_value,
		// 					ticket_name: book.ticket_name,
		// 				};
		// 			})
		// 		)
		// 		.then((details) => setBookDetails(details));

		// 	console.log(bookDetails);

		// 	return (
		// 		<tbody>
		// 			<tr>
		// 				{/* <th>{bookDetails[0].ticket_name}</th> */}
		// 				<th>{safeBooks[key].length}</th>
		// 			</tr>

		// 			<tr>
		// 				<td>{key}</td>
		// 				<td>{safeBooks[key][0]}</td>
		// 			</tr>
		// 			<tr>
		// 				<td>{key}</td>
		// 				<td>{safeBooks[key][1]}</td>
		// 			</tr>
		// 			<tr>
		// 				<td>{key}</td>
		// 				<td>{safeBooks[key][2]}</td>
		// 			</tr>
		// 		</tbody>
		// 	);
		// });
	};

	return (
		<div>
			<Navbar bg='danger' className='justify-content-between' expand='lg'>
				<Button
					variant='dark'
					onClick={() => history.push('/isifunctions/isireport')}
				>
					Back
				</Button>
				<ButtonGroup className='mr-2'>
					<Button variant='secondary' onClick={() => window.print()}>
						Print
					</Button>
				</ButtonGroup>
			</Navbar>

			<div className='print-content'>
				<DisplayBooks />
			</div>
		</div>
	);
}
