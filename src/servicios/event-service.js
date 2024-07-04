import EventRepository from "../repositorios/event-repository.js";
import { Pagination } from "../utils/Paginacion.js";
const repository = new EventRepository();

const pagination = new Pagination();

export class EventService{
    async getEventByFilter(Event, pageSize, reqPage) {
        const parsedLimit = pagination.parseLimit(pageSize);
        const parsedOffset = pagination.parseOffset(reqPage);
        const eventPorFiltro = await repository.getEventByFilter(Event, parsedLimit, parsedOffset);
        return {eventPorFiltro};
    }
    
      async getEventById(id) {
        return await repository.getEventById(id);
    }
    
      async getEventEnrollment(enrollment) {
        const eventEnrollment = await repository.getEventEnrollment(enrollment);
        return eventEnrollment;
    }
    
      async patchEvento(Event) {
        await repository.patchEvento(Event);
        return "Evento Actualizado correctamente";
    }
    
      async DeleteEvent(id) {
       await repository.DeleteEvent(id);
        return "Evento Eliminado correctamente";
    }
    
      async InscripcionEvento(enrollment) {
        await repository.InscripcionEvento(enrollment);
        return "Evento Inscripto correctamente";
    }
    
      async CambiarRating(id, rating) {
        await repository.UpdateRating(rating,id);
        return "Rating actualizado correctamente";
    }
    
      async InsertEvento(event) {    
        await repository.InsertEvent(event);
        return "Evento Insertado correctamente";
    }
}
