import EventRepository from "../repositorios/event-repository.js";
import { Pagination} from "../utils/paginacion.js";
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
        return "Se actualizo";
    }
    
      async DeleteEvent(id) {
       await repository.DeleteEvent(id);
        return "Se elimino";
    }
    
      async InscripcionEvento(enrollment) {
        await repository.InscripcionEvento(enrollment);
        return "Se inscribio";
    }
    
      async CambiarRating(id, rating) {
        await repository.UpdateRating(rating,id);
        return "Se actualizo el rating";
    }
    
      async InsertEvento(event) {    
        await repository.InsertEvent(event);
        return "Se inserto";
    }
}
