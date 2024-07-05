import EventRepository from "../repositorios/event-repository.js";
import { Pagination } from "../utils/Paginacion.js";
const repository = new EventRepository();

const pagination = new Pagination();

export class EventService{
    async getAllEvents(Event, pageSize, reqPage){
        const parsedLimit = pagination.parseLimit(pageSize);
        const parsedOffset = pagination.parseOffset(reqPage);
        const allEvents = await repository.getAllEvents(Event, parsedLimit, parsedOffset);
        return allEvents;
    }

    async getEventByFilter(Event, pageSize, reqPage) {
        const parsedLimit = pagination.parseLimit(pageSize);
        const parsedOffset = pagination.parseOffset(reqPage);
        const filtros = await repository.getEventByFilter(Event, parsedLimit, parsedOffset);
        return {filtros};
    }

      async getEventEnrollment(enrollment) {
        const eventEnrollment = await repository.getEventEnrollment(enrollment);
        return eventEnrollment;
    }

    async detalleEvent(id){
      const detalle = await repository.detalleEvent(id);
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
