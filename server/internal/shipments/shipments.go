package shipments

import (
	"database/sql"
	"log"

	database "github.com/gnomon-church/mona-api/internal/db/postgre"
)

type Shipment struct {
	ShipmentID   string
	DateReceived string
}

func (shipment Shipment) AddShipment() {
	stmt, err := database.Db.Prepare("INSERT INTO Shipments(shipment_id,date_received) VALUES($1,$2)")
	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec(shipment.ShipmentID, shipment.DateReceived)
	if err != nil {
		log.Fatal(err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Fatal("Error: ", err.Error())
	}

	log.Print("Database interaction complete: ", rows, " affected.")
}

func GetShipments(shipmentID *string, dateReceived *string) []Shipment {
	var stmt *sql.Stmt
	var err error
	var rows *sql.Rows

	if shipmentID != nil && dateReceived != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments WHERE shipment_id = $1 AND date_received = $2")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(shipmentID, dateReceived)
	} else if shipmentID != nil && dateReceived == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments WHERE shipment_id = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(shipmentID)
	} else if shipmentID == nil && dateReceived != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments WHERE date_received = $1")
		if err != nil {
			log.Fatal(err)
		}
		rows, err = stmt.Query(dateReceived)
	} else {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments")
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

	var shipments []Shipment

	for rows.Next() {
		var shipment Shipment
		err := rows.Scan(&shipment.ShipmentID, &shipment.DateReceived)
		if err != nil {
			log.Fatal(err)
		}
		shipments = append(shipments, shipment)
	}

	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return shipments
}
