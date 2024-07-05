import pg from "pg";
import { BDConfig } from "../DB/db.js";


export default class LocationRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDConfig);
    this.BDclient.connect();
  }
    async cantLocations(){
      try {
        var sql = "SELECT COUNT(*) FROM locations"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async getLocations(limit,offset){
        let entity = null;
        try{
        const sql="SELECT * FROM locations order by id limit $1 offset $2";
        const values=[limit,offset]
        const result=await this.BDclient.query(sql,values);
        
        if(result.rows.length>0){
            entity = result.rows;
        }
        }catch(error){
        console.log(error)
        }
     return entity;
    }
    
    async getLocationsById(id){
        let entity = null;
        try {
        var sql = `SELECT * FROM locations WHERE id=$1`;
        const values = [id];
        const result = await this.BDclient.query(sql, values);

        if (result.rows.length > 0) {
            entity = result.rows[0];
        }
            } catch (error) {
        console.log(error);
            }
        return entity;
    }

    async getLocationByProvincia(id_provincia,limit,offset){
        let entity = null;
        try{
            const sql="SELECT * FROM locations WHERE id_province=$1 limit $2 offset $3";
            const values=[id_provincia,limit,(offset*limit)];
            const result = await this.BDclient.query(sql,values);
            
            if(result.rows.length>0){
                entity=result.rows;
            }
        }catch(error){
            console.log(error)
        }
        return entity;
    }
}