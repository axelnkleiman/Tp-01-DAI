import pg from "pg";
import { BDConfig } from "../DB/db.js";

export default class UserRepository{
    constructor(){
        const {Client}=pg;
        this.BDclient=new Client(BDConfig)
        this.BDclient.connect();
    }

    async getUserById(id){
            let entity = null;
            try{
                const sql="SELECT * FROM users WHERE id=$1";
                const values=[id]
                const result=await this.BDclient.query(sql,values);
    
                if(result.rows.length>0){
                    entity=result.rows[0];
                }
            }catch(error){
                console.log(error)
            }
            return entity;
    }

    async getUserByName(user,pass){
        let entity = null;
        try{
            const sql="SELECT * FROM users WHERE username=$1 and password=$2";
            const values=[user,pass];
            const result=await this.BDclient.query(sql,values);
            if(result.rows.length>0){
                entity = result.rows[0];
            }
        }catch(error){
            console.log(error)
        }
        return entity;
}
async InsertUser(user) {
    let entity = null;
    try {
        const sql1 = "SELECT id FROM users ORDER BY id DESC LIMIT 1";
        const ultimoIdResult = await this.BDclient.query(sql1);
        let id = 1;
        if (ultimoIdResult.rows.length > 0) {
            id = ultimoIdResult.rows[0].id + 1;
        }
        const sql = "INSERT INTO users(id, first_name, last_name, username, password) VALUES($1, $2, $3, $4, $5)";
        const values = [id, user.first_name, user.last_name, user.username, user.password];
        const result = await this.BDclient.query(sql, values);
        if (result.rowCount > 0) {
            entity = result.rows[0];
        }
    } catch (error) {
        console.log(error);
    }
    return entity;
}

};