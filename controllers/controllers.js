const { Client } = require('pg');

// const connectionURL = process.env.DATABASE_URL;
const connectionURL = 'postgres://szjzhfjgzxubrz:a91920638868ef1c941ef53fe55e6664afcbfcf196fca4dec630cf4cb4b11a90@ec2-54-161-150-170.compute-1.amazonaws.com:5432/ddhl6c9kg91vhh';

const figuresDownload = (req, res, next) => {
    const client = new Client({
        connectionString: connectionURL,
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
        .then(() => client.end())
}

const figuresUpload = (req, res, next) => {
    const b = req.body;
    const values = [b.store, b.date, b.staff, b.usedPayouts, b.putAside, b.hundreds, b.fifties, b.twenties, b.tens, b.fives, b.coins, b.cashActual, b.cashRegister, b.cashDiff, b.eftposOne, b.eftposTwo, b.eftposThree, b.eftposPrev, b.eftposActual, b.eftposRegister, b.eftposDiff, b.epayActual, b.epayRegister, b.epayDiff, b.lottoGross, b.isiCommission, b.isiNet, b.lottoActual, b.lottoRegister, b.lottoDiff, b.isiDiff, b.totalPrizes, b.isiCash, b.lottoPayActual, b.lottoPayRegister, b.lottoPayDiff, b.isiFree, b.isiPayActual, b.isiPayRegister, b.isiPayDiff, b.totalDiff];

    const client = new Client({
        connectionString: connectionURL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("INSERT INTO eod_figures VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41);", values)
        .catch(e => console.error(e.stack))
        .then(() => client.end())
        .then(res.status(200))
}

const bookTypeDownload = (req, res, next) => {
    const client = new Client({
        connectionString: connectionURL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client
        .query("SELECT * FROM book_types")
        .then((rows) => {
            res.json(rows)
        })
        .then(() => client.end())
}

module.exports.figuresDownload = figuresDownload;
module.exports.figuresUpload = figuresUpload;
module.exports.bookTypeDownload = bookTypeDownload;