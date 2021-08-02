package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var Db *sql.DB

const (
	host     = "ec2-54-161-150-170.compute-1.amazonaws.com"
	port     = 5432
	user     = "szjzhfjgzxubrz"
	password = "a91920638868ef1c941ef53fe55e6664afcbfcf196fca4dec630cf4cb4b11a90"
	dbname   = "ddhl6c9kg91vhh"
)

func InitConnection() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=require",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	// defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	Db = db
}
