// Returns all ISI game types
export function allGameTypes() {
	// Return the Axios request
	return {
		url: '/request',
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
