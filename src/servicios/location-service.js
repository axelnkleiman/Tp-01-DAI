import LocationRepository from "../repositorios/location-repository.js"
import EventLocationRepository from "../repositorios/eventLocation-repository.js"
import { Pagination } from "../utils/paginacion.js";

const Paginacion = new Pagination();
const repository= new LocationRepository();
const repositoryEventLocation = new EventLocationRepository()

export class LocalidadService {

    async getLocalidades(limit, offset) {
        const parsedLimit = Paginacion.parseLimit(limit);
        const parsedOffset = Paginacion.parseOffset(offset);
        const cantidad=Number.parseInt(await repository.cantLocalidades())
        const paginacion = Paginacion.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/localidad`)
        const localidades=await repository.getLocalidades(parsedLimit,parsedOffset)

        const collection={localidades,paginacion}
        return collection;  
    }

    async getLocalidadById(id){
        return await repository.getLocalidadById(id);  
    }
    
    async getEventLocationByLocalidad(id,limit,offset){
        const parsedLimit = Paginacion.parseLimit(limit);
        const parsedOffset = Paginacion.parseOffset(offset);
        const cantidad =  Number.parseInt(await repositoryEventLocation.cantEvLocByLocation(id));
        const paginacion = Paginacion.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/localidad/${id}/event-location`)
        const EventLocations= await repositoryEventLocation.getEventLocationsByLocation(id,parsedLimit,parsedOffset);
        const collection={EventLocations,paginacion}
        return collection;
    }
}