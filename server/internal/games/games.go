package games

import (
	"database/sql"
	"errors"

	database "github.com/gnomon-church/mona-api/internal/db/postgre"
)

type GameType struct {
	GameID      string
	GameName 	string
	TicketValue	int
	TicketCount int
	CurrentGame bool
	PromoGame	bool
}

func (gameType GameType) CreateGame() error {
	stmt, err := database.Db.Prepare("INSERT INTO game_types(game_id,ticket_value,ticket_name,book_value,current_game) VALUES($1,$2,$3,$4,$5)")
	if err != nil {
		return errors.New("ERRQUERYPREP")
	}

	res, err := stmt.Exec(gameType.GameID, gameType.GameName, gameType.TicketValue, gameType.TicketCount, gameType.CurrentGame, gameType.PromoGame)
	if err != nil {
		if err.Error() == "pq: duplicate key value violates unique constraint \"game_types_pk\"" {
			return errors.New("ERRGAMEXISTS")
		} else {
			return errors.New("ERRQUERYEXEC")
		}
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return errors.New("ERRUNKNOWN")
	}

	_ = rows
	return nil
}

func (gameType GameType) ModifyGame() error {
	stmt, err := database.Db.Prepare("UPDATE game_types SET ticket_value = $2, ticket_name = $3, book_value = $4, current_game = $5 WHERE game_id = $1")
	if err != nil {
		return errors.New("ERRQUERYPREP")
	}

	res, err := stmt.Exec(gameType.GameID, gameType.GameName, gameType.TicketValue, gameType.TicketCount, gameType.CurrentGame, gameType.PromoGame)
	if err != nil {
		return errors.New("ERRQUERYEXEC")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return errors.New("ERRUNKNOWN")
	} else if rows == 0 {
		return errors.New("ERRGAMENOTEXISTS")
	}

	_ = rows
	return nil
}

func (gameType GameType) RemoveGame() error {
	stmt, err := database.Db.Prepare("DELETE FROM game_types WHERE game_id = $1")
	if err != nil {
		return errors.New("ERRQUERYPREP")
	}

	res, err := stmt.Exec(gameType.GameID)
	if err != nil {
		return errors.New("ERRQUERYEXEC")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return errors.New("ERRUNKNOWN")
	} else if rows == 0 {
		return errors.New("ERRGAMENOTEXISTS")
	}

	_ = rows
	return nil
}

func GetGames(gameID *string, currentGame *bool) ([]GameType, error) {
	var stmt *sql.Stmt
	var err error
	var rows *sql.Rows

	if gameID != nil && currentGame != nil {
		return nil, errors.New("ERRTOOMANYARGS")
	} else if gameID != nil && currentGame == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_types WHERE game_id = $1")
		if err != nil {
			return nil, errors.New("ERRQUERYPREP")
		}
		rows, err = stmt.Query(gameID)
	} else if gameID == nil && currentGame != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_types WHERE current_game = $1")
		if err != nil {
			return nil, errors.New("ERRQUERYPREP")
		}
		rows, err = stmt.Query(currentGame)
	} else if gameID == nil && currentGame == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_types")
		if err != nil {
			return nil, errors.New("ERRQUERYPREP")
		}
		rows, err = stmt.Query()
	}

	defer stmt.Close()

	if err != nil {
		return nil, errors.New("ERRQUERYEXEC")
	}
	defer rows.Close()

	var gameTypes []GameType

	for rows.Next() {
		var gameType GameType
		err := rows.Scan(&gameType.GameID, &gameType.GameName, &gameType.TicketValue, &gameType.TicketCount, &gameType.CurrentGame, &gameType.PromoGame)
		if err != nil {
			return nil, errors.New("ERRSCANISSUE")
		}
		gameTypes = append(gameTypes, gameType)
	}

	if err = rows.Err(); err != nil {
		return nil, errors.New("ERRUNKNOWN")
	}

	return gameTypes, nil
}
