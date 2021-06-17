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

			<div className='print-content'>
				<DisplayBooks />
			</div>
		</div>
	);
}
