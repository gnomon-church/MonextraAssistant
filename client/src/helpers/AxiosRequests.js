// Returns all ISI game types
export function allGameTypes() {
	return {
		url: '/query',
		method: 'post',
		data: {
			query: `query {
					gameTypes {
						game_id
						ticket_value
						ticket_name
						book_value
						current_game
					}
					}`,
		},
	};
}

export function createGameType(newGameObj) {
	console.log(newGameObj)
	return {
		url: '/query',
		method: 'post',
		data: {
			mutation: `mutation {
  						createGameType(input: {game_id: ${newGameObj.game_id}, ticket_name: ${newGameObj.ticket_name}, ticket_value: ${newGameObj.ticket_value}, book_value: ${newGameObj.book_value}, current_game: ${newGameObj.current_game}}) {
    						game_id
  						}
			}`,
		},
	};
}
