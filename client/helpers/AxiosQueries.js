// Returns all ISI game types
export function allGameTypes() {
	// Return the Axios request
	return {
		url: "/request",
		method: "post",
		data: {
			query: `query {
					gameTypes {
						game_id
						game_name
						ticket_value
						ticket_count
						current_game
						promo_game
					}
					}`,
		},
	};
}
