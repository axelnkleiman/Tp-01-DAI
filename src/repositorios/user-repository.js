import pg from 'pg';
import { BDConfig } from "../../db.js";

export default class UserRepository{
    constructor(){
        this.client = new pg.Client(BDConfig);
        this.client.connect();
    }
    async Consulta(sql) {
        const respuesta = await this.client.query(sql);
        return respuesta;
    }
    
}