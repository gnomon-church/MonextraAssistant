const { Client } = require('pg');

const connectionConfig = require('./db_config');

const gameDelete = (req, res, next) => {
    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("DELETE FROM game_types WHERE game_id = $1", [req.params.GAMEID])
        .then((rows) => {
            res.json(rows)
        })
        .then(() => client.end())
}

const gameTypeDownload = (req, res, next) => {
    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("SELECT * FROM game_types")
        .then((rows) => {
            res.json(rows)
        })
        .then(() => client.end())
}

const gameDetails = (req, res, next) => {
    const client = new Client({
        connectionString: connectionConfig.db_url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("SELECT * FROM game_types WHERE game_id = $1", [req.params.GAMEID])
        .then((rows) => {
            console.log(rows)
            res.json(rows)
        })
        .then(() => client.end())
}



module.exports.gameDelete = gameDelete;
module.exports.gameTypeDownload = gameTypeDownload;
module.exports.gameDetails = gameDetails;