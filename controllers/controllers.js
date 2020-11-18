const { Client } = require('pg');

const client = new Client({
    // connectionString: process.env.DATABASE_URL,
    connectionString: 'postgres://szjzhfjgzxubrz:a91920638868ef1c941ef53fe55e6664afcbfcf196fca4dec630cf4cb4b11a90@ec2-54-161-150-170.compute-1.amazonaws.com:5432/ddhl6c9kg91vhh',
    ssl: {
        rejectUnauthorized: false
    }
});


const saySomething = (req, res, next) => {
    res.status(200);
    client.connect();
    client.query('SELECT * FROM eod_figures;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
};

const figuresUpload = (req, res, next) => {
    res.status(200);
    console.log(req.body)
    // client.connect();
    // client.query('INSERT INTO eod_figures')
    // client.end();
}

module.exports.saySomething = saySomething;
module.exports.figuresUpload = figuresUpload;