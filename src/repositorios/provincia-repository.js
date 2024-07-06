import pg from "pg";
import { BDConfig } from "../DB/db.js";

export default class ProvinciaRepository{
    constructor(){
        const {Client}=pg;
        this.BDclient=new Client(BDConfig);
        this.BDclient.connect();
    }

    async cantProvincias(){
      try {
        var sql = "SELECT COUNT(*) FROM provinces";
        const result = await this.BDclient.query(sql);
        return result.rows[0].count;
      } catch (error) {
        return error;
      }
    }

    async getProvinciaById(id){
        let entity = null;
        try{
            const sql="SELECT * FROM provinces WHERE id=$1";
            const values=[id];
            const result=await this.BDclient.query(sql,values);
            if(result.rows.length>0){
                entity = result.rows[0];
            }
        
        }catch(error){
            console.log(error)
        }
        return entity;
    }

    async getProvincias(limit, offset){
        let entity = null;
        try{
            const sql="SELECT * FROM provinces ORDER BY id ASC LIMIT $1 OFFSET $2";
            const values = [limit, offset]
            const result=await this.BDclient.query(sql, values);
            
            if(result.rows.length>0){
                entity=result.rows;
            }
        }catch(error){
            console.log(error)
        }
        return entity;
    }

    async patchProvincia(Provincia){
            let entity = null;
            var index = 2;
            const values = [Provincia.id];
        
            try {
              var sql = `UPDATE provinces SET`;
              if (Provincia.name != null) {
                sql += ` name=$${index},`;
                values.push(Provincia.name)
                index++;
              }
              if (Provincia.full_name != null) {
                sql += ` full_name=$${index},`;
                values.push(Provincia.full_name)
                index++;
              }
              if (Provincia.latitude!= null) {
                sql += ` latitude=$${index},`;
                values.push(Provincia.latitude)
                index++;
              }
              if (Provincia.longitude!= null) {
                sql += ` longitude=$${index},`;
                values.push(Provincia.longitude)
                index++;
               }
              if (Provincia.display_order!= null) {
                sql += ` display_order=$${index},`;
                values.push(Provincia.display_order)
                index++;     
              }
              if (sql.endsWith(",")) {
                sql = sql.slice(0, -1);
              }
              sql += ` WHERE id=$1`;
              const result = await this.BDclient.query(sql, values);
              entity=result.rowsAffected;
            } catch (error) {
              console.log(error);
            }
            return entity;
    }

    async deleteProvincia(id){
        var entity = null;
        try {
          const sql = `Delete FROM provinces WHERE id=$1`;
          const values = [id];
          const result = await this.BDclient.query(sql, values);
          entity = result.rowsAffected;

        }catch (error) {
          console.log(error);
        }
        return entity;
    }
    
    async insertProvincia(Provincia){
      let entity = null;
      try {
      const sql = `Insert into provinces(name,full_name,latitude,longitude,display_order) values ($1,$2,$3,$4,$5)`;
      const values = [ Provincia.name , Provincia.full_name , Provincia.latitude , Provincia.longitude , Provincia.display_order ];
      entity = await this.BDclient.query(sql, values);
      return "Provincia insertada correctamente";
      }catch (error) {
      console.log(error);
      return "Error";
      }
    }
    async DeleteLocationsById(id){
      var entity=null
      try{
          const sql=`DELETE FROM locations WHERE id_province=$1`
          const values=[id]
          const result= await this.BDclient.query(sql,values);
      if (result.rows.length>0) {
        entity=result.rows;
      }
      }catch(error){
        console.log(error);
      }
      return entity;
    
    }
    
};