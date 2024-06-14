import pg from 'pg';
import { DBConfig } from "../../db.js";

export default class UserRepository{
    constructor(){
        this.client = new pg.Client(DBConfig);
        this.client.connect();
    }
    async Consulta(sql) {
        const respuesta = await this.client.query(sql);
        return respuesta;
    }
    
}