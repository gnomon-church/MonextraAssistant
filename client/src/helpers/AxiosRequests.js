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

export function createGameType(
	game_id,
	ticket_name,
	ticket_value,
	book_value,
	current_game
) {
	return {
		url: '/query',
		method: 'post',
		data: {
			mutation: `mutation {
  						createGameType(input: {game_id: ${game_id}, ticket_name: ${ticket_name}, ticket_value: ${ticket_value}, book_value: ${book_value}, current_game: ${current_game}}) {
    						game_id
  						}
			}`,
		},
	};
}
