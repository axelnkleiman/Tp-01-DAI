import ProvinciaRepository from "../repositorios/provincia-repository.js";
import LocationRepository from "../repositorios/location-repository.js";
import { Pagination } from "../utils/Paginacion.js";

const repository = new ProvinciaRepository();
const locationRepository = new LocationRepository();
const PaginacionConfig = new Pagination();

export class ProvinciaService {
  async getProvincias(pageSize, reqPage) {
    const parsedLimit = PaginacionConfig.parseLimit(pageSize) 
    const parsedOffset = PaginacionConfig.parseOffset(reqPage)
    const cantidad =  Number.parseInt(await repository.cantProvincias());
    const nextPage = ((parsedOffset+1)*parsedLimit<=cantidad) ?`/province`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const provincias = await repository.getProvincias(parsedLimit, parsedOffset)
    return {provincias, paginacion};  
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
    const locations = ((await this.getLocationByProvincia(id,1,0)).localidades);
    if (locations == null) {
       await repository.deleteProvincia(id);
       return true;
    }else{
      return false;
    }
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
}