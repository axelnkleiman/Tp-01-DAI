import pg from "pg";
import { DBConfig } from "../../db.js";
const client = new pg.Client(DBConfig);
export default class BD{
    construct(){
        const {Client} = pg;
        this.Client = new Client(bdConfig);
        this.Client.connect();
    }
    
    async Consulta1(pageSize, page){
        const query = `SELECT events.id, events.name, events.description, events.start_date, events.duration_in_minutes, events.price, events.enabled_for_enrollment, events.max_assistance, tags.name, users.id, users.username, users.first_name, users.last_name, event_categories.id, event_categories.name, event_locations.id, event_locations.name, event_locations.full_address, event_locations.latitude, event_locations.longitude, event_locations.max_capacity    
        FROM events events    
        JOIN users ON events.id_creator_user = users.id
        JOIN event_categories ON events.id_event_category = events_categories.id
        JOIN event_tags ON events.id = event_tags.id_event
        JOIN tags ON event_tags.id_tag = tags.id
        JOIN event_locations ON events.id_event_location = event_locations.id limit  ${pageSize} offset ${requestedPage}`;
        const respuesta = await this.client.query(query);
        return respuesta.rows;
    }
    async Consulta2(name, category, startDate, tag){ 
        const variables = [name, category, startDate, tag]
        const query = this.ValidacionConsul2(variables)
        const respuesta = await this.client.query(query);
        return respuesta.rows;
    }
    
    ValidacionConsulta2(variables){
        const validaciones = []
        if (variables[0]) validaciones.push(`e.name = '${variables[0]}'`)
        if (variables[1]) validaciones.push(`ec.name = '${variables[1]}'`)
        if (variables[2]) validaciones.push(`e.start_date = ${variables[2]}`)
        if (variables[3]) validaciones.push(`t.name = '${variables[3]}'`)  
        const query = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.id as tags_id ,t.name as tags_name, u.id as user_id, u.username, u.first_name, u.last_name, ec.id as eventcat_id, ec.name as eventcat_name, el.id as el_id, el.name as el_name, el.full_address, el.latitude, el.longitude, el.max_capacity  
        FROM events e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_locations el ON e.id_event_location = el.id
        ${variables.length > 0 ?  `WHERE ${validaciones.join(' AND ')}` : null}`;
        return query;
    }
    
    async Consulta3(id){
        const query = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance , el.id_location, el.name as el_name, el.full_address, el.longitude, el.latitude, el.max_capacity
        FROM events e
        JOIN event_locations el ON e.id_event_location = el.id
        WHERE e.id = '${id}'`;
        const respuesta = await this.client.query(query);
        return respuesta; 
    }

    async Consulta4(id, first_name, last_name, username, attended, rating){
        const query = `SELECT u.id, u.username, u.first_name, u.last_name, ee.attended, ee.rating, ee.description 
        FROM users 
        JOIN event_enrollments ee ON u.id = ee.id_user
        WHERE u.id = '${id}' AND u.username = '${username}' AND u.first_name = '${first_name}' AND u.last_name = '${last_name}' AND ee.attended = '${attended}' AND ee.rating = '${rating}'`
        const respuesta = await this.client.query(query);
        return respuesta;
    }

    async Consulta5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const query = `INSERT INTO events (id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
        values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
        const respuesta = await this.client.query(query);
        return respuesta;
    }

    async Consulta6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const query = `UPDATE events SET id = '${id}', name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_envet_location = '${id_envet_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await this.client.query(query);
        return respuesta;
    }

    async Consulta7(id, id_creator_user){
        const query = `DELETE * FROM events 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await this.client.query(query);
        return respuesta;
    }
}