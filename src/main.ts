import express from "express"
import pgp from'pg-promise';
import dotenv from 'dotenv';
import Contato from "./Contato";
import midlewares from './midlewares';

dotenv.config()

const dbSettings = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30
};

const app = express();
midlewares(app);


app.get('/contacts', async (req, res) => {
    const db = pgp()(dbSettings);
    const contactsInstance = new Contato(db);
    const contacts = await contactsInstance.all()
    db.$pool.end;
    res.json(contacts);
})


app.post('/contacts', async (req, res) => {
    const db = pgp()(dbSettings);
    const contactsInstance = new Contato(db);
    try {
        await contactsInstance.save(req);
        res.json({
            status: 'Contato salvo com sucesso'
        });
    } catch (e: any) {
        res.json({ error: e.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Aplicação online! 👌 na porta ${process.env.PORT}`);
})
