import pg from "pg";
import { DBConfig } from "../../db.js";
const client = new pg.Client(DBConfig);
export default class BD{
    construct(){
        const {Client} = pg;
        this.Client = new Client(bdConfig);
        this.Client.connect();
    }
}