export class EventService{
    getAllEvents(pageSize, requestedPage){
        const query = `select * from events limit ${pageSize} offset ${requestedPage}`;
        const query2 = `select count(*) from events`;
        const query3 = `select event.name, event.description, event_categories.name, event_locations.name, event.start_date, event.duration_in_minutes, event.price, event.enabled_for_enrollment, event.max_assistance, users.username from evenets 
        inner join event_categories 
        on id_event_category = event_categories.id
        inner join event_locations
        on id_event_location = event_locations.id
        inner join users
        on id_creator_user = users.id`
    }
    getEventsConFiltro(pageSize, page, name, category, startDate, tag){
        const query = `select * from events limit ${pageSize} offset ${page}`
    }
}