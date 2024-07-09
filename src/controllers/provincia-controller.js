import express from "express";
import {ProvinciaService} from "../servicios/provincia-service.js";

const router = express.Router();
const provinciaService = new ProvinciaService();

router.post("/", async (request, response) => {
    const Provincia = {};
    Provincia.id = request.params.id;
    Provincia.name = request.body.name;
    Provincia.full_name = request.body.full_name;
    Provincia.latitude = request.body.latitude
    Provincia.longitude = request.body.longitude;
    Provincia.display_order = request.body.display_order;
    
    try {
      const respuesta = await provinciaService.insertProvincia(Provincia);
      return response.json(respuesta);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
});

router.get("/", async (request, response) =>{
    const pageSize = request.query.pageSize;
    const page = request.query.page;

    try{
        const provincias = await provinciaService.getProvincias(pageSize, page);
        console.log(provincias);
        return response.send(provincias);
    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    } 
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const provinciaByid = await provinciaService.getProvinciaById(id);
    if (provinciaByid!=null) {
      return response.status(200).json(provinciaByid);
    }else{
      return response.status(404).json("No se encuentra el id");
    }
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.patch("/:id", async (request, response) => {
    const Provincia = {};
    Provincia.id = request.params.id;
    Provincia.name = request.body.name;
    Provincia.full_name = request.body.full_name;
    Provincia.latitude = request.body.latitude;
    Provincia.longitude = request.body.longitude;
    Provincia.display_order = request.body.display_order;
    try {
      const respuesta = await provinciaService.patchProvincia(Provincia);
      return response.json("Provincia Actualizada");
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
    });
  

router.delete("/:id", async (request, response) => {
    const id = request.params.id;
    try{
      const provincia = await provinciaService.DeleteProvincia(id);
      const location = await provinciaService.DeleteLocationsById(id);
      console.log(provincia);
      return response.status(200).json("Se elimino la provincia");
    } catch (error) {
      console.log(error);
      return response.status(404).json("No se puede eliminar la provincia");
    }
    });

  router.get("/:id/locations", async (request, response) => {
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const id = request.params.id;
    try{
      const provincia = await provinciaService.getProvinciaById(id);
      const respuesta = await provinciaService.getLocationsByProvincia(id, pageSize, page);
      return response.status(200).json(respuesta);
    }catch(error){
      console.log(error);
      return response.json(error);
    }
  })

export default router;