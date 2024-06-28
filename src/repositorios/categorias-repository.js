import pg from "pg";
import { BDConfig } from "../../db.js";
const client = new pg.Client(BDConfig);
export default class CategoryRepository{
    construct(){
        const {Client} = pg;
        this.Client = new Client(bdConfig);
        this.Client.connect();
    }
}