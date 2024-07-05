import express from "express";
import {LocationService} from "../servicios/location-service.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const locationService = new LocationService();

const router = express.Router();

router.get("/", async (request, response) => {
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    try {
      const locations = await locationService.getLocations(pageSize, page);
      return response.status(200).json(locations);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
});


router.get("/:id", async (request, response) => {
  const id = request.params.id;
  console.log(id);
  try {
    const locationById = await locationService.getLocalidadById(id);
    if (locationById!=null) {
      return response.status(200).json(locationById);
    }else{
      return response.status(401).json("No existe la id");
  
    }
  } catch (error) {
    console.log(error);
      return response.json(error);
  }
});

router.get("/:id/event-location", AuthMiddleware ,async (request, response)=>{
  const id = request.params.id;
  const limit = request.query.limit;
  const offset = request.query.offset;
  try {
    if (await locationService.getLocationsById(id)!=null) {
      const collection = await locationService.getEventLocationsByLocation(id,limit, offset);
      return response.status(200).json(collection);
    }else{
      return response.status(404).send("EventLocation No Encontrado")
    }
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
}); 

export default router;