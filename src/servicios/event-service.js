import EventRepository from "../repositorios/event-repository.js";
import {Paginacion, PaginationDto} from "../utils/paginacion.js";

const repository = new EventRepository();
const PaginacionConfig = new Paginacion();

export class EventService{
    async getAllEvents(limit, offset){
      const parsedLimit = PaginacionConfig.parseLimit(limit);
      const parsedOffset = PaginacionConfig.parseOffset(offset);
      const cantidad = Number.parseInt(await repository.cantEventos());
      const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/events`);
      const events = await repository.getAllEvents(parsedLimit,parsedOffset);

      const collection={events,paginacion}  
      return collection;
    }

    async getEventByFilter(Event, pageSize, reqPage) {
        const parsedLimit = PaginacionConfig.parseLimit(pageSize);
        const parsedOffset = PaginacionConfig.parseOffset(reqPage);
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
    
      async patchEvent(Event) {
        await repository.patchEvent(Event);
        return "Evento Actualizado correctamente";
    }
    
      async deleteEvent(id) {
      const result = await repository.deleteEvent(id);
      return result;
    }
    
      async inscripcionEvent(enrollment) {
        const result = await repository.inscripcionEvent(enrollment);
        return result;
    }
    
      async updateRating(id, rating) {
        await repository.updateRating(rating,id);
        return "Rating actualizado correctamente";
    }
    
      async insertEvent(event) {   
        await repository.insertEvent(event);
        return "Evento Insertado correctamente";
    }
    async getEvent_TagsById(id){
      const result = await repository.getEvent_TagsById(id);
      return result;
    }
    async getEvent_EnrollmentById(id){
      const result = await repository.getEvent_EnrollmentById(id);
      return result;
    }
    async deleteEventEnrollment(id){
      const result = await repository.deleteEventEnrollment(id);
      return result;
    }
}
