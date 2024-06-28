import pg from "pg";
import { BDConfig } from "../DB/db.js";
const client = new pg.Client(BDConfig);
export default class LocationRepository{
    construct(){
        const {Client} = pg;
        this.Client = new Client(bdConfig);
        this.Client.connect();
    }
}