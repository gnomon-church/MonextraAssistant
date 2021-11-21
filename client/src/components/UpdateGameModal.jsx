// import React, { useState } from "react";
// import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

// export default function UpdateGameModal(props) {
// 	const [showAddDialog, setShowAddDialog] = useState(false);

// 	const closeAddDialog = () => setShowAddDialog(false);
// 	const openAddDialog = () => setShowAddDialog(true);

// 	return (
// 		<Modal
// 			show={showAddDialog}
// 			onHide={closeAddDialog}
// 			backdrop="static"
// 			keyboard={false}
// 		>
// 			<Modal.Header>
// 				<Modal.Title>ISI Game Details</Modal.Title>
// 			</Modal.Header>

// 			<Modal.Body>
// 				<InputGroup className="mb-3">
// 					<InputGroup.Prepend>
// 						<InputGroup.Text>Game Number</InputGroup.Text>
// 					</InputGroup.Prepend>
// 					<FormControl
// 						type="text"
// 						onChange={numberValidator}
// 						name="game_id"
// 						placeholder={gameEditData.game_id}
// 						disabled={true}
// 					/>
// 				</InputGroup>

// 				<InputGroup className="mb-3">
// 					<InputGroup.Prepend>
// 						<InputGroup.Text>Ticket Value</InputGroup.Text>
// 						<InputGroup.Text>$</InputGroup.Text>
// 					</InputGroup.Prepend>
// 					<FormControl
// 						type="text"
// 						onChange={numberValidator}
// 						name="ticket_value"
// 						defaultValue={gameEditData.ticket_value}
// 					/>
// 				</InputGroup>

// 				<InputGroup className="mb-3">
// 					<InputGroup.Prepend>
// 						<InputGroup.Text>Book Value</InputGroup.Text>
// 						<InputGroup.Text>$</InputGroup.Text>
// 					</InputGroup.Prepend>
// 					<FormControl
// 						type="text"
// 						onChange={numberValidator}
// 						name="book_value"
// 						defaultValue={gameEditData.book_value}
// 					/>
// 				</InputGroup>

// 				<InputGroup className="mb-3">
// 					<InputGroup.Prepend>
// 						<InputGroup.Text>Ticket Name</InputGroup.Text>
// 					</InputGroup.Prepend>
// 					<FormControl
// 						type="text"
// 						onChange={valueUpdater}
// 						name="ticket_name"
// 						defaultValue={gameEditData.ticket_name}
// 					/>
// 				</InputGroup>

// 				<InputGroup className="mb-3">
// 					<InputGroup.Prepend>
// 						<InputGroup.Text>Current Game?</InputGroup.Text>
// 					</InputGroup.Prepend>
// 					<InputGroup.Append>
// 						<InputGroup.Checkbox
// 							defaultChecked={gameEditData.current_game}
// 							onChange={(event) => toggleCurrentGame(event)}
// 						></InputGroup.Checkbox>
// 					</InputGroup.Append>
// 				</InputGroup>
// 			</Modal.Body>

// 			<Modal.Footer>
// 				<Button
// 					variant="secondary"
// 					onClick={() => {
// 						gameEditData.game_id = null;
// 						gameEditData.ticket_value = null;
// 						gameEditData.book_value = null;
// 						gameEditData.ticket_name = null;
// 						gameEditData.current_game = true;
// 						setGameEditData({ ...gameEditData });
// 						closeAddDialog();
// 					}}
// 				>
// 					Close
// 				</Button>
// 				<Button variant="success" onClick={gameAdd}>
// 					Save
// 				</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	);
// }
