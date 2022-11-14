import express from "express"
import pgp from'pg-promise';
require('dotenv').config()

const cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30
};

const app = express();


app.get('/contacts', async (req, res) => {
    const db = pgp()(cn);
    const contacts = await db.query('SELECT * FROM CONTATOS')

    res.json(contacts);
})

app.listen(80, () => {
    console.log('Aplicação online! 👌')
})
