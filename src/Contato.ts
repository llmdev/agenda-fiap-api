import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export default class Contato {

    constructor(private dbConection: pgp.IDatabase<{}, pg.IClient>){}

    async save(req: any) {
        try {
            await this.dbConection.none('INSERT INTO contatos(apelido, nome, sobrenome, telefone, cep, logradouro, complemento, numero, cidade, uf) VALUES(${apelido}, ${nome}, ${sobrenome}, ${telefone}, ${endereco.cep}, ${endereco.logradouro}, ${endereco.complemento}, ${endereco.numero}, ${endereco.cidade}, ${endereco.uf})', {
                endereco: {cep: req.body.cep, logradouro: req.body.logradouro, complemento: req.body.complemento, numero: req.body.numero, cidade: req.body.cidade, uf: req.body.uf},
                nome: req.body.nome,
                telefone: req.body.telefone,
                sobrenome: req.body.sobrenome,
                apelido: req.body.apelido
            });   
        } catch (error) {
            throw new Error("Erro ao cadastrar contato");
        }
    }

    async all() {
        const getContacts = await this.dbConection.query('SELECT * FROM CONTATOS');
        return getContacts;
    }
}