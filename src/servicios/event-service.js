export class EventService{
    getAllEvents(pageSize, requestedPage){
        const query = `SELECT * FROM events limit ${pageSize} offset ${requestedPage}`;
        const query2 = `SELECT COUNT(*) FROM events`;
        const query3 = `SELECT event.name, event.description, event_categories.name, event_locations.name, event.start_date, event.duration_in_minutes, event.price, event.enabled_for_enrollment, event.max_assistance, users.username FROM evenets 
        INNER JOIN event_categories 
        ON id_event_category = event_categories.id
        INNER JOIN event_locations
        ON id_event_location = event_locations.id
        INNER JOIN users
        ON id_creator_user = users.id`
    }
    getEventsConFiltro(pageSize, page, name, category, startDate, tag){
        const query = `SELECT * from events limit ${pageSize} offset ${page}`
        const query2 = `SELECT events.name, event_categories.name, events.start_date, tags.name IF(events.name = ${name}, event_cateories.name = ${category} events.start_date = ${startDate}, tags.name = ${tag})`
    }
}