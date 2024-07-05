import pg from "pg"
import { BDconfig } from "../configs/BD.js"

export default class UserRepository{

    constructor(){
        const {Client}=pg;
        this.BDclient=new Client(BDconfig)
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
    async InsertUser(user){
        try{
        const sql="INSERT INTO users(first_name,last_name,username,password) VALUES ($1,$2,$3,$4)";
        const values=[user.first_name,user.last_name, user.username, user.password];
        await this.BDclient.query(sql,values);
        }catch(error){
            console.log(error)
        }
    }
}