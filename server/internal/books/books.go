package books

import (
	"database/sql"
	"errors"
	"log"

	database "github.com/gnomon-church/mona-api/internal/db/postgre"
)

type GameBook struct {
	GameID      string
	BookNumber  string
	ShipmentID  string
	SignOutDate string
}

func (gameBook GameBook) AddBook() error {
	stmt, err := database.Db.Prepare("INSERT INTO game_books(game_id,book_number,shipment_id,sign_out_date) VALUES($1,$2,$3,$4)")
	if err != nil {
		log.Print(err.Error())
		return errors.New("unknown error (1)")
	}

	res, err := stmt.Exec(gameBook.GameID, gameBook.BookNumber, gameBook.ShipmentID, "-infinity")
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (2)")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (3)")
	}

	log.Print("Database interaction complete: ", rows, " affected.")
	return nil
}

func (gameBook GameBook) SignOutBook() error {
	stmt, err := database.Db.Prepare("UPDATE game_books SET sign_out_date = $3 WHERE game_id = $1 AND book_number = $2")
	if err != nil {
		log.Print(err.Error())
		return errors.New("unknown error (1)")
	}

	res, err := stmt.Exec(gameBook.GameID, gameBook.BookNumber, gameBook.SignOutDate)
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (2)")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Print(err)
		return errors.New("unknown error (3)")
	}

	log.Print("Database interaction complete: ", rows, " affected.")
	return nil
}

func GetBooks(gameID *string, bookNumber *string, shipmentID *string, signOutDate *string) ([]GameBook, error) {
	var stmt *sql.Stmt
	var err error
	var rows *sql.Rows

	if gameID == nil && bookNumber != nil {
		return nil, errors.New("cannot take book_number argument without game_id")
	} else if gameID != nil && bookNumber == nil && shipmentID == nil && signOutDate == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_books WHERE game_id = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(gameID)
	} else if gameID != nil && bookNumber != nil && shipmentID == nil && signOutDate == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_books WHERE game_id = $1 AND book_number = $2")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(gameID, bookNumber)
	} else if gameID == nil && bookNumber == nil && shipmentID != nil && signOutDate != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_books WHERE shipment_id = $1 AND sign_out_date = $2")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(shipmentID, signOutDate)
	} else if gameID == nil && bookNumber == nil && shipmentID != nil && signOutDate == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_books WHERE shipment_id = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(shipmentID)
	} else if gameID == nil && bookNumber == nil && shipmentID == nil && signOutDate != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_books WHERE sign_out_date = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(signOutDate)
	} else if gameID == nil && bookNumber == nil && shipmentID == nil && signOutDate == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM game_books")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query()
	} else {
		return nil, errors.New("invalid combination of arguments")
	}

	defer stmt.Close()

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var gameBooks []GameBook

	for rows.Next() {
		var gameBook GameBook
		err := rows.Scan(&gameBook.GameID, &gameBook.BookNumber, &gameBook.ShipmentID, &gameBook.SignOutDate)
		if err != nil {
			log.Print(err)
			return nil, errors.New("unknown error (1)")
		}
		gameBooks = append(gameBooks, gameBook)
	}

	if err = rows.Err(); err != nil {
		log.Print(err)
		return nil, errors.New("unknown error (2)")
	}

	return gameBooks, nil
}
