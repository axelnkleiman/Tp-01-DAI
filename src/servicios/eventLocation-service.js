import EventLocationRepository from "../repositorios/eventLocation-repository.js";
import {Paginacion, PaginationDto} from "../utils/paginacion.js";

const PaginacionConfig = new Paginacion();
const repository = new EventLocationRepository()

export class EventLocationService{
    async getEventLocationsByUser(id,limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad =  Number.parseInt(await repository.cantEventLocation(id));
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/event-location`)
        const eventLocation= await repository.getEventLocationsByUser(id,parsedLimit,parsedOffset);

        const collection={eventLocation,paginacion}
        return collection;
    }

    async getEventLocationById(id){
        return await repository.getEventLocationById(id);
    }

    async InsertEventLocation(EventLocation){
        await repository.InsertEventLocation(EventLocation);
        return "EventLocation Insertado correctamente";
    }

    async UpdateEventLocation(EventLocation){
        await repository.UpdateEventLocation(EventLocation);
        return "EventLocation Actualizado correctamente";
    }

    async deleteEventLocation(id){
        await repository.deleteEventLocation(id);
        return "EventLocation eliminado correctamente"; 
    }
}