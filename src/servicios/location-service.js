import { query } from "express";
import LocationRepository from "../repositorios/location-repository.js";
import EventLocationRepository from "../repositorios/eventLocation-repository.js";
import { Pagination } from "../utils/Paginacion.js";

const PaginacionConfig = new Pagination();
const repository = new LocationRepository();
const repositoryEL = new EventLocationRepository()

export class LocationService {

    async getLocations(limit, offset) {
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad = Number.parseInt(await repository.cantLocations());
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/localidad`);
        const locations = await repository.getLocations(parsedLimit,parsedOffset);

        const collection={locations,paginacion}
        return collection;
    }

    async getLocationsById(id){
        return await repository.getLocationsById(id);  
    }
    
    async getEventLocationsByLocation(id,limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad =  Number.parseInt(await repositoryEL.cantEventLocationByLocation(id));
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/localidad/${id}/event-location`);
        const EventLocations= await repositoryEL.getEventLocationsByLocation(id,parsedLimit,parsedOffset);
        const collection={EventLocations,paginacion}
        return collection;
    }
}