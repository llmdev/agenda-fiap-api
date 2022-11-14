import express from "express"
import pgp from'pg-promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30
};

const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/contacts', async (req, res) => {
    const db = pgp()(cn);
    const contacts = await db.query('SELECT * FROM CONTATOS')

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contacts);
})

app.listen(process.env.PORT || 5050, () => {
    console.log(`Aplicação online! 👌 na porta ${process.env.PORT}`)
})
