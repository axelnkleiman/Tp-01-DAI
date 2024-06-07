import express from "express";
import {LocationService} from "../servicios/location-service.js";
import AuthMiddleware from "../auth/authmiddleware.js";

const locationService = new LocationService();

const router = express.Router();

router.get("/", async (request, response) => {
    const pageSize = request.query.pageSize;
    const reqPage = request.query.reqPage;
    try {
      const Localidades = await locationService.getLocalidades(pageSize, reqPage);
      return response.status(200).json(Localidades);
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
      return response.status(200).json(LocalidadById);
    }else{
      return response.status(401).json("No existe la id");
  
    }
  } catch (error) {
    console.log(error);
      return response.json(error);
  }
});

export default router;