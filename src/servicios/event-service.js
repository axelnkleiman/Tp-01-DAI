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

      async getEventEnrollment(enrollment) {
        const eventEnrollment = await repository.getEventEnrollment(enrollment);
        return eventEnrollment;
    }

    async detalleEvent(id){
      const detalle = await repository.deleteEvent(id);
      return detalle;
    }
    
      async patchEvento(Event) {
        await repository.patchEvento(Event);
        return "Evento Actualizado correctamente";
    }
    
      async deleteEvent(id) {
       await repository.deleteEvent(id);
        return "Evento Eliminado correctamente";
    }
    
      async inscripcionEvent(enrollment) {
        await repository.inscripcionEvent(enrollment);
        return "Evento Inscripto correctamente";
    }
    
      async updateRating(id, rating) {
        await repository.updateRating(rating,id);
        return "Rating actualizado correctamente";
    }
    
      async insertEvent(event) {    
        await repository.insertEvent(event);
        return "Evento Insertado correctamente";
    }
}
