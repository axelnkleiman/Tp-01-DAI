import pkg from "pg";
import { BDConfig } from "../db.js";

export default class ProvinciaRepository {
    constructor() {
        const { Client } = pkg;
        this.DBClient = new Client(BDConfig);
        this.DBClient.connect();
    }
    async getProvinciaByIdAsync(id) {
        let returnEntity = null;
        try{
            const sql = "SELECT * from provinces p WHERE p.id = $1";
            const values = {id};
            const result = await this.DBClient.query(sql, values);

            if(result.rows.length > 0) {
                returnEntity = result.rows(0);
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}   