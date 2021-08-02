package games

import (
	"database/sql"
	"errors"
	"log"

	database "github.com/gnomon-church/mona-api/internal/db/postgre"
)

type GameType struct {
	GameID      string
	TicketValue string
	TicketName  string
	BookValue   string
	CurrentGame bool
}

func (gameType GameType) CreateGame() error {
	stmt, err := database.Db.Prepare("INSERT INTO game_types(game_id,ticket_value,ticket_name,book_value,current_game) VALUES($1,$2,$3,$4,$5)")
	if err != nil {
		log.Print(err.Error())
		return errors.New("unknown error (1)")
	}

	res, err := stmt.Exec(gameType.GameID, gameType.TicketValue, gameType.TicketName, gameType.BookValue, gameType.CurrentGame)
	if err != nil {
		log.Print(err)
		if err.Error() == "pq: duplicate key value violates unique constraint \"game_types_pk\"" {
			return errors.New("game already exists")
		} else {
			return errors.New("unknown error (2)")
		}
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (3)")
	}

	log.Print("Database interaction complete: ", rows, " affected.")
	return nil
}

func (gameType GameType) ModifyGame() error {
	stmt, err := database.Db.Prepare("UPDATE game_types SET ticket_value = $2, ticket_name = $3, book_value = $4, current_game = $5 WHERE game_id = $1")
	if err != nil {
		log.Print(err.Error())
		return errors.New("unknown error (1)")
	}

	res, err := stmt.Exec(gameType.GameID, gameType.TicketValue, gameType.TicketName, gameType.BookValue, gameType.CurrentGame)
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (2)")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (3)")
	} else if rows == 0 {
		log.Print("game \"", gameType.GameID, "\" does not exist")
		return errors.New("game does not exist")
	}

	log.Print("Database interaction complete: ", rows, " affected.")
	return nil
}

func (gameType GameType) RemoveGame() error {
	stmt, err := database.Db.Prepare("DELETE FROM game_types WHERE game_id = $1")
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (1)")
	}

	res, err := stmt.Exec(gameType.GameID)
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (2)")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Print("Error: ", err.Error())
		return errors.New("unknown error (3)")
	} else if rows == 0 {
		log.Print("game \"", gameType.GameID, "\" does not exist")
		return errors.New("game does not exist")
	}

	log.Print("Database interaction complete: ", rows, " affected.")
	return nil
}

func GetGames(gameID *string, currentGame *bool) ([]GameType, error) {
	var stmt *sql.Stmt
	var err error
	var rows *sql.Rows

	if gameID != nil && currentGame != nil {
		return nil, errors.New("cannot take more than one argument")
	} else if gameID != nil && currentGame == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_types WHERE game_id = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(gameID)
	} else if gameID == nil && currentGame != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_types WHERE current_game = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(currentGame)
	} else if gameID == nil && currentGame == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_types")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query()
	}

	defer stmt.Close()

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var gameTypes []GameType

	for rows.Next() {
		var gameType GameType
		err := rows.Scan(&gameType.GameID, &gameType.TicketValue, &gameType.TicketName, &gameType.BookValue, &gameType.CurrentGame)
		if err != nil {
			log.Print(err)
			return nil, errors.New("unknown error (1)")
		}
		gameTypes = append(gameTypes, gameType)
	}

	if err = rows.Err(); err != nil {
		log.Print(err)
		return nil, errors.New("unknown error (2)")
	}

	return gameTypes, nil
}
