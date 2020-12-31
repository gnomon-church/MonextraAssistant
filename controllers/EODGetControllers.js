const { Client } = require('pg');

const connectionConfig = require('./db_config');

const figuresDownload = (req, res, next) => {
    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("SELECT * FROM eod_figures WHERE store = $1 AND date = $2;", [req.params.Store, req.params.Date])
        .then((rows) => {
            res.json(rows)
        })
        .then(() => client.end());
}


module.exports.figuresDownload = figuresDownload;
