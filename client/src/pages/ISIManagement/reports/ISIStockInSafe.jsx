import React, { useState } from 'react';
import { Button, Navbar, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function PDFReport() {
	let history = useHistory();

	let idReg = /^[0-9]{4}/;
	let bookReg = /^[0-9]{4}([0-9]{6})/;

	setBookData(book);

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
			.then((book) => {});
	}

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

			<div className='print-content'></div>
		</div>
	);
}
