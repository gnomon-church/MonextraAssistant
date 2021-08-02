import React, { useEffect } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Navigation from '../components/Navigation';

import '../styles/style.css';

export default function ISIMenu() {
	useEffect(() => {
		document.title = 'ISI Management - Mona';
	}, []);

	let history = useHistory();

	return (
		<div>
			<Navigation proceed='false' from='/' />
			<div id='card-deck-set'>
				<CardDeck>
					<Card
						onClick={() => {
							history.push('/isimenu/isireceive');
						}}
						className='card-list'
						style={{ width: '18rem', cursor: 'pointer' }}
					>
						<Card.Body>
							<Card.Title>Receive</Card.Title>
							<Card.Text>
								Receive shipments of ISI books.
							</Card.Text>
						</Card.Body>
					</Card>

					<Card
						onClick={() => {
							history.push('/isimenu/isisignout');
						}}
						className='card-list'
						style={{ width: '18rem', cursor: 'pointer' }}
					>
						<Card.Body>
							<Card.Title>Sign Out</Card.Title>
							<Card.Text>
								Sign ISI books out of the safe
							</Card.Text>
						</Card.Body>
					</Card>
				</CardDeck>
				<br />

				<CardDeck>
					<Card
						onClick={() => {
							history.push('/isimenu/isireport');
						}}
						className='card-list'
						style={{ width: '18rem', cursor: 'pointer' }}
					>
						<Card.Body>
							<Card.Title>Reports</Card.Title>
							<Card.Text>
								Generate and view various ISI reports
							</Card.Text>
						</Card.Body>
					</Card>

					<Card
						onClick={() => {
							history.push('/isimenu/isimanage');
						}}
						className='card-list'
						style={{ width: '18rem', cursor: 'pointer' }}
					>
						<Card.Body>
							<Card.Title>Manage</Card.Title>
							<Card.Text>Manage ISI book types</Card.Text>
						</Card.Body>
					</Card>
				</CardDeck>
			</div>
		</div>
	);
}
