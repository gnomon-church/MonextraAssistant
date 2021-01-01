const { Client } = require('pg');

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
    const b = req.body



    console.log(b)

    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    for (let i = 0; i < b.length; i++) {
        b[i]['shipment_id'] = req.params.SHIPMENTID
        client
            .then(console.log('test'))
            .query("INSERT INTO isi_books VALUES ($1, $2, $3, $4)", [b[i].game_id, b[i].book_number, b[i].signout_date, b[i].shipment_id])
            .then((rows) => {
                res.status(201).json(rows)
            })
            .then(() => client.end())
    }


};

module.exports.gameTypeUpload = gameTypeUpload;
module.exports.shipmentDetailsUpload = shipmentDetailsUpload;
module.exports.receiveShipment = receiveShipment;