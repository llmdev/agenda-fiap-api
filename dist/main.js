"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.get('/', (req, res) => {
    res.json({
        foo: 'bar'
    });
});
app.get('/contacts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, pg_promise_1.default)()(cn);
    const contacts = yield db.query('SELECT * FROM CONTATOS');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(contacts);
}));
app.listen(process.env.PORT, () => {
    console.log(`Aplicação online! 👌 na porta ${process.env.PORT}`);
});
