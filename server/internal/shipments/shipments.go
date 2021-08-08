package shipments

import (
	"database/sql"
	"errors"

	database "github.com/gnomon-church/mona-api/internal/db/postgre"
)

type Shipment struct {
	ShipmentID   string
	DateReceived string
}

func (shipment Shipment) AddShipment() error {
	stmt, err := database.Db.Prepare("INSERT INTO Shipments(shipment_id,date_received) VALUES($1,$2)")
	if err != nil {
		return errors.New("ERRQUERYPREP")
	}

	res, err := stmt.Exec(shipment.ShipmentID, shipment.DateReceived)
	if err != nil {
		return errors.New("ERRQUERYEXEC")
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return errors.New("ERRUNKNOWN")
	}

	_ = rows
	return nil
}

func GetShipments(shipmentID *string, dateReceived *string) ([]Shipment, error) {
	var stmt *sql.Stmt
	var err error
	var rows *sql.Rows

	if shipmentID != nil && dateReceived != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments WHERE shipment_id = $1 AND date_received = $2")
		if err != nil {
			return nil, errors.New("ERRQUERYPREP")
		}
		rows, err = stmt.Query(shipmentID, dateReceived)
	} else if shipmentID != nil && dateReceived == nil {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments WHERE shipment_id = $1")
		if err != nil {
			return nil, errors.New("ERRQUERYPREP")
		}
		rows, err = stmt.Query(shipmentID)
	} else if shipmentID == nil && dateReceived != nil {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments WHERE date_received = $1")
		if err != nil {
			return nil, errors.New("ERRQUERYPREP")
		}
		rows, err = stmt.Query(dateReceived)
	} else {
		stmt, err = database.Db.Prepare("SELECT * FROM shipments")
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

	var shipments []Shipment

	for rows.Next() {
		var shipment Shipment
		err := rows.Scan(&shipment.ShipmentID, &shipment.DateReceived)
		if err != nil {
			return nil, errors.New("ERRSCANISSUE")
		}
		shipments = append(shipments, shipment)
	}

	if err = rows.Err(); err != nil {
		return nil, errors.New("ERRUNKNOWN")
	}

	return shipments, nil
}
