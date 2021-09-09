// Creates a new ISI game
export function createGameType(newGameObj) {
	// Return the Axios request
	return {
		url: "/request",
		method: "post",
		data: {
			mutation: `	mutation {
  							createGameType(input: {game_id: ${newGameObj.game_id}, ticket_name: ${newGameObj.ticket_name}, ticket_value: ${newGameObj.ticket_value}, book_value: ${newGameObj.book_value}, current_game: ${newGameObj.current_game}}) {
    							game_id
  							}
						}`,
		},
	};
}

// Deletes an existing ISI game
export function removeGameType(gameId) {
	// Ensure that gameId is a string as GraphQL is expexting
	gameId = gameId.toString();

	// Return the Axios request
	return {
		url: "/request",
		method: "post",
		data: {
			mutation: `	mutation {
    						removeGameType(input: ${gameId}) {
        						game_id
    						}
						}`,
		},
	};
}
