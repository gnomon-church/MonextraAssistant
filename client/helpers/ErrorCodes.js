export const Errors = {
	// Generic Errors
	ERRUNKNOWN:
		"Something's gone wrong and I'm too lazy to figure out what it is.",
	ERRINVALIDARGS: "An invalid combination of arguments has been provided.",
	ERRTOOMANYARGS: "To many arguments have been provided.",

	// Query Errors
	ERRQUERYPREP: "There was an error preparing the SQL query.",
	ERRQUERYEXEC: "There was an error executing the SQL query.",
	ERRSCANISSUE: "There was an issue scanning the query result to the array.",

	// Game Errors
	ERRNEEDSGAMEID: "A 'game_id' must be provided along with the 'book_number'.",
	ERRGAMEXISTS: "A game with this 'game_id' already exists.",
	ERRGAMENOTEXISTS: "No game with this 'game_id' exists.",
};
