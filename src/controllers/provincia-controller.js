import express, { request, response } from "express";
import {ProvinciaService} from "../servicios/provincia-service.js";

const router = express.Router();
const provinciaService = new ProvinciaService();

router.post("/", (request, response) => {
    const body = request.body;
    return response.status(201).send({
        page: body.page,
        pageSize: body.pageSize,
        name: body.name,
        full_name: body.full_name,
        latitude: body.latitude,
        longitude: body.longitude,
        display_order: body.display_order,
    });
});

router.get("/", (request, response) =>{
    const pageSize = request.body.pageSize;
    const page = request.body.page;
    const name = request.body.name;
    const full_name = request.body.full_name;
    const latitude = request.body.latitude;
    const longitude = request.body.longitude;
    const display_order = request.body.display_order;

    try{
        provinciaService.getProvincias(pageSize, page, name, full_name, latitude, longitude, display_order);
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

router.patch("/:id", (request, response) => {
    return {
      id: request.params.id,
    };
  });
  

router.delete("/:id", (request, response) => {
    const id = request.params.id;
    console.log(id);
    return response.send("Ok!");
  });

export default router;