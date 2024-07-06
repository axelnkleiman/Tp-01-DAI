import ProvinciaRepository from "../repositorios/provincia-repository.js";
import LocationRepository from "../repositorios/location-repository.js";
import {Paginacion, PaginationDto} from "../utils/paginacion.js";

const repository = new ProvinciaRepository();
const locationRepository = new LocationRepository();
const PaginacionConfig = new Paginacion();

export class ProvinciaService {
  async getProvincias(limit, offset) {
    const parsedLimit = PaginacionConfig.parseLimit(limit);
    const parsedOffset = PaginacionConfig.parseOffset(offset);
    const cantidad = Number.parseInt(await repository.cantProvincias());
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/provinces`);
    const provincia = await repository.getProvincias(parsedLimit,parsedOffset);

    const collection={provincia,paginacion}  
    return collection;
  }

  async getProvinciaById(id){
    return await repository.getProvinciaById(id);
  }

  async insertProvincia(Provincia) {
    return await repository.insertProvincia(Provincia);
  }

  async patchProvincia(Provincia) {
    return await repository.patchProvincia(Provincia);
  }

  async DeleteProvincia(id) {
       return await repository.deleteProvincia(id);
  }

  async getLocationsByProvincia(id_provincia,limit,offset){
    const parsedLimit = PaginacionConfig.parseLimit(limit) 
    const parsedOffset = PaginacionConfig.parseOffset(offset)
    const cantidad =  Number.parseInt(await locationRepository.cantLocations());
    const nextPage = ((parsedOffset+1)*parsedLimit<=cantidad) ?`/province/${id_provincia}/locations`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const localidades = await locationRepository.getLocationByProvincia(id_provincia,parsedLimit,parsedOffset)
    return {localidades, paginacion};  
}
async DeleteLocationsById(id){
    return await repository.DeleteLocationsById(id);
}
}