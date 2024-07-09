import pg from "pg";
import { BDConfig } from "../DB/db.js";

export default class EventRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDConfig);
    this.BDclient.connect();
  }

    async cantEventos() {
        try {
            var sql = "SELECT COUNT(*) FROM events"
            const result = await this.BDclient.query(sql)
            return result.rows[0].count
            } catch (error) {
                return error;
            }
        }
        async getAllEvents(limit, offset) {
            try {
                var sql = "SELECT * FROM events ORDER BY id ASC LIMIT $1 OFFSET $2";
                const values = [limit, offset];
                const result = await this.BDclient.query(sql, values);
                return result.rows;
                } catch (error) {
                    return error;
                }
            }

    async getEventByFilter(Event, pageSize, reqPage) {
        var entity = null;
        try {
        var sql = `SELECT e.name, e.description, ec.name as Category, el.name as Location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance 
                    FROM events e 
                    LEFT join event_categories ec on e.id_event_category=ec.id 
                    LEFT join event_tags et on e.id=et.id_event 
                    LEFT join tags t on et.id_tag=t.id 
                    LEFT join locations el on e.id_event_location = el.id 
                    LEFT join users u on e.id_creator_user = u.id WHERE `;
        const values = [
            pageSize,
            reqPage,
        ];
        var index = 3;

        if (Event.name != null) {
            sql += ` e.name=$${index} and`;
            values.push(Event.name);
            index++;
        }
        if (Event.category != null) {
            sql += ` ec.name=$${index} and`;
            values.push(Event.category);
            index++;
        }
        if (Event.startDate != null) {
            sql += ` e.start_date=$${index} and`;
            values.push(Event.startDate);
            index++;
        }
        if (Event.tag != null) {
            sql += ` t.name=$${index} and`;
            values.push(Event.tag);
            index++;
        }

        if (sql.endsWith(" and")) {
            sql = sql.slice(0, -4);
        }
        if (sql.endsWith(" where ")) {
            sql = sql.slice(0, -7);
        }
        sql += " group by e.id, e.description, e.name,ec.name,el.name,e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance order by e.id asc limit $1 offset $2 ";
        const result = await this.BDclient.query(sql, values);

        if (result.rows.length > 0) {
            entity = result.rows;
        }
        } catch (error) {
        console.log(error);
        }
        return entity;
    }

    async detalleEvent(id) {
        let entity = null;
        try {
        var sql = `SELECT e.name, e.description, ec.name as Category, el.name as Location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance 
                    FROM events e 
                    INNER join event_categories ec on e.id_event_category=ec.id 
                    INNER join event_tags et on e.id=et.id_event 
                    INNER join tags t on et.id_tag=t.id
                    INNER join locations el on e.id_event_location = el.id 
                    INNER join users u on e.id_creator_user = u.id 
                    WHERE e.id=$1`;
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

    async getEventEnrollment(enrollment) {
        let entity = null;
        try {
        var sql = `select ev.id,ev.name as Evento, u.first_name as Nombre, u.last_name as Apellido, u.username, ee.attended, ee.rating from events ev 
                    INNER join event_enrollments ee on ev.id=ee.id_event 
                    INNER join users u on ev.id_creator_user = u.id 
                    WHERE ev.id=$1 and `;
        var index = 2;
        const values = [enrollment.event_id];

        if (enrollment.nombreEvent != null) {
                sql += ` ev.name=$${index} and`;
                values.push(enrollment.nombreEvent)
                index++;
        }
        if (enrollment.firstName != null) {
                sql += ` u.first_Name=$${index} and`;
                values.push(enrollment.firstName)
                index++;
        }
        if (enrollment.lastName != null) {
                sql += ` u.last_name=$${index} and`;
                values.push(enrollment.lastName)
                index++;
        }
        if (enrollment.username != null) {
                sql += ` u.username=$${index} and`;
                values.push(enrollment.username)
                index++;
        }
        if (enrollment.attended != null) {
                sql += ` ee.attended=$${index} and`;
                values.push(enrollment.attended)
                index++;
        }
        if (enrollment.rating != null) {
                sql += ` ee.rating=$${index} and`;
                values.push(enrollment.attended)
                index++;
        }

        if (sql.endsWith(" and ")) {
            sql = sql.slice(0, -5);
        }
        if (sql.endsWith(" and where")) {
            sql = sql.slice(0, -10);
        }
        const result = await this.BDclient.query(sql, values);
        if (result.rows.length > 0) {
            entity = result.rows;
        }
        } catch (error) {
        console.log(error);
        }
        return entity;
    }

    async patchEvent(Event) {
        var index = 2;
        const values = [Event.id];
        try {
        var sql = `UPDATE events SET`;
        if (Event.name != null) {
            sql += ` name=$${index},`;
            values.push(Event.name)
            index++;
        }

        if (Event.description != null) {
            sql += ` description=$${index},`;
            values.push(Event.description)
            index++;
        }

        if (Event.start_date != null) {
            sql += ` start_date=$${index},`;
            values.push(Event.start_date)
            index++;
        }

        if (Event.duration_in_minutes != null) {
            sql += ` duration_in_minutes=$${index},`;
            values.push(Event.duration_in_minutes)
            index++;
        }

        if (Event.price != null) {
            sql += ` price=$${index},`;
            values.push(Event.price)
            index++;     
        }

        if (
            Event.enabled_for_enrollment != null &&
            (Event.enabled_for_enrollment == "true" ||
            Event.enabled_for_enrollment == "false")
        ) {
            sql += ` enabled_for_enrollment=$${index},`;
            values.push(Event.enabled_for_enrollment)
            index++;   
        }

        if (Event.max_assistance != null) {
            sql += ` max_assistance=$${index},`;
            values.push(Event.max_assistance)
            index++;  
        }

        if (sql.endsWith(",")) {
            sql = sql.slice(0, -1);
        }
        sql += ` WHERE id=$1`;
        const result = await this.BDclient.query(sql, values);

        } catch (error) {
        console.log(error);
        }
    }

    async deleteEvent(id) {
        try {
        const sql = `Delete FROM events WHERE id=$1`;
        const values = [id];
        const result = await this.BDclient.query(sql, values);
        console.log(result)
        } catch (error) {
        console.log(error);
        }
    }

    async inscripcionEvent(enrollment, event) {
        const entity = null;
        try {
        var sql = ""
        if (event.enabled_for_enrollment) {
            sql = `INSERT INTO event_enrollments(id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES ($1,$2,$3,$4,$5,null,$6)`;
            const values = [enrollment.idEvent, enrollment.user_id, enrollment.description, enrollment.registration_date_time, enrollment.attended, enrollment.rating]
            const respuesta = await this.BDclient.query(sql, values); 
            if (result.rows.length>0) {
                entity=result.rows;
              }
            console.log( "HOLAL " + respuesta)
        }else {
            const aaa = "Error"
            console.log(aaa)
        }
      
        } catch (error) {
        console.log(error);
        }
        return entity;
    }

    async updateRating(rating,id) {
        try {
        const sql = `UPDATE event_enrollments SET rating=$1 WHERE id=$2`;
        const values = [rating,id];
        await this.BDclient.query(sql, values);

        } catch (error) {
        console.log(error);
        }
    } 

    async insertEvent(Event) {
        try {
        const sql = `INSERT INTO events(name,description,id_event_category,id_event_location,start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance, id_creator_user) values ($1,$9,$2,$3,$4,$5,$6,$7,$8, $10)`;
        const values = [Event.name ,Event.id_event_category, Event.id_event_location, Event.start_date, Event.duration_in_minutes, Event.price, Event.enabled_for_enrollment, Event.max_assistance, Event.description, Event.id_creator_user];
        const respuesta = await this.BDclient.query(sql, values);
        console.log(respuesta);
        } catch (error) {
        console.log(error);
        }
    }  
    async getEvent_TagsById(id){
        var entity=null
        try{
            const sql="SELECT * FROM event_tags WHERE id_event=$1"
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

      async getEvent_EnrollmentById(id){
        var entity=null
        try{
            const sql="SELECT * FROM event_enrrolments WHERE id_event=$1";
            const values=[id];
            const result= await this.BDclient.query(sql,values);
        if (result.rows.length>0) {
          entity=result.rows;
        }
        }catch(error){
          console.log(error);
        }
        return entity;
      }
      async deleteEventEnrollment(id){
        try {
            const sql = `Delete FROM event_enrollments WHERE id=$1`;
            const values = [id];
            const result = await this.BDclient.query(sql, values);
            console.log(result)
            } catch (error) {
            console.log(error);
            }
      }
}
