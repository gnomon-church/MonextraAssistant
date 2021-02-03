const { Client } = require('pg');
const pgFormat = require('pg-format');

const connectionConfig = require('./db_config');

const gameTypeUpload = (req, res, next) => {
    const b = req.body
    const values = [b.game_id, b.ticket_value, b.ticket_name, b.book_value, b.current_game]

    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("INSERT INTO game_types VALUES ($1,$2,$3,$4,$5) ON CONFLICT (game_id) DO UPDATE SET ticket_value = $2, ticket_name = $3, book_value = $4, current_game = $5;", values)
        .then((rows) => {
            res.json(rows)
        })
        .catch(e => console.error(e.stack))
        .then(() => client.end())
        .then(res.status(200))
};

const shipmentDetailsUpload = (req, res, next) => {
    const b = req.body;
    const values = [b.shipment_id, b.date_received];

    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("SELECT shipment_id FROM shipments WHERE shipment_id = $1", [values[0]])
        .then((result) => {
            if (result.rows.length !== 0) {
                res.status(400).json({ err_type: 'already_exists' })
            } else {
                client
                    .query("INSERT INTO shipments VALUES ($1,$2)", values)
                    .then((rows) => {
                        res.status(201).json(rows)
                    })
                    .then(() => client.end())
            }
        })


};

const receiveShipment = (req, res, next) => {
    let dataArr = []

    for (let i = 0; i < req.body.length; i++) {
        // dataArr[i] = [req.body[i].game_id, req.body[i].book_number, req.body[i].signout_date, req.params.SHIPMENTID]
        dataArr[i] = [req.body[i].game_id, req.body[i].book_number, req.query.shipment_id] 
    }

    let sqlQuery = pgFormat('INSERT INTO isi_books (game_id, book_number, shipment_id) VALUES %L', dataArr)

    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query(sqlQuery)
        .then((rows) => {
            res.status(201).json(rows)
        })
        .then(() => client.end())


};

const signOutBooks = (req, res, next) => {
    
}


module.exports.gameTypeUpload = gameTypeUpload;
module.exports.shipmentDetailsUpload = shipmentDetailsUpload;
module.exports.receiveShipment = receiveShipment;
module.exports.signOutBooks = signOutBooks;