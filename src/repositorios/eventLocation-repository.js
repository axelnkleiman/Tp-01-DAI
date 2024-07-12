import pg from "pg";
import { BDConfig } from "../DB/db.js";

export default class EventLocationRepository {
    constructor() {
      const { Client } = pg;
      this.BDclient = new Client(BDConfig);
      this.BDclient.connect();
    }

    async getEventLocationsByUser(id,limit,offset){
        let entity = null;
        try {
      var sql = `SELECT * FROM event_locations WHERE id_creator_user=$1 ORDER BY id asc limit $2 offset $3 `;
      const values = [id,limit,offset];
      const result = await this.BDclient.query(sql, values);
      if (result.rows.length > 0) {
        entity = result.rows;
      }
        } catch (error) {
      console.log(error);
        }
        return entity;
    }

    async getEventLocationsByLocation(id,limit,offset){
      let entity = null;
      try {
    var sql = `SELECT * FROM event_locations WHERE id_location=$1 order by id asc limit $2 offset $3 `;
    const values = [id,limit,offset];
    const result = await this.BDclient.query(sql, values);
    if (result.rows.length > 0) {
      entity = result.rows;
    }
      } catch (error) {
    console.log(error);
      }
      return entity;
  }

    async getEventLocationById(id){
        let entity = null;
      try {
        var sql = `SELECT * FROM event_locations WHERE id=$1`;
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
    async InsertEventLocation(eventLocation){
      try{
        const sql ='INSERT INTO event_locations (id_location, name, full_address, max_capacity,latitude,longitude,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7)'
        const values=[eventLocation.id_location, eventLocation.name, eventLocation.full_address, eventLocation.max_capacity, eventLocation.latitude, eventLocation.longitude, eventLocation.id_creator_user]
        await this.BDclient.query(sql, values);
      }catch(error){
        console.log(error)
      }
    }

    async UpdateEventLocation(EventLocation){
      try {
        const values = [EventLocation.id]
        var sql = `UPDATE event_locations SET`;
        var index = 2;

        if (EventLocation.name != null) {
          sql += ` name=$${index},`;
          values.push(EventLocation.name)
          index++;
        }

        if (EventLocation.full_address != null) {
          sql += ` full_address=$${index},`;
          values.push(EventLocation.full_address)
          index++;
        }

        if (EventLocation.max_capacity != null) {
          sql += ` max_capacity=$${index},`;
          values.push(EventLocation.max_capacity)
          index++;
        }

        if (EventLocation.latitude != null) {
          sql += ` latitude=$${index},`;
          values.push(EventLocation.latitude)
          index++;
        }
        if (EventLocation.longitude != null) {
          sql += ` longitude=$${index},`;
          values.push(EventLocation.longitude)
          index++;
        }
        if (EventLocation.id_creator_user != null) {
          sql += ` id_creator_user=$${index},`;
          values.push(EventLocation.id_creator_user)
          index++;
        }

        if (sql.endsWith(",")) {
          sql = sql.slice(0, -1);
        }
        sql += " WHERE id=$1"
        await this.BDclient.query(sql,values);   
      } catch (error) {
        console.log(error);
      }
    }

    async deleteEventLocation(id){
      try {
        const sql = `DELETE FROM event_locations WHERE id=$1`;
        const values = [id];
        const result = await this.BDclient.query(sql, values);
        console.log(result)
        } catch (error) {
        console.log(error);
        }
    }

    async cantEventLocation(id){
      try {
        var sql = "SELECT COUNT(*) FROM event_locations WHERE id_creator_user=$1"
        const values=[id]
        const result = await this.BDclient.query(sql,values)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async cantEventLocationByLocation(id){
      try {
        var sql = "SELECT COUNT(*) FROM event_locations WHERE id_location=$1"
        const values=[id]
        const result = await this.BDclient.query(sql,values)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }
}