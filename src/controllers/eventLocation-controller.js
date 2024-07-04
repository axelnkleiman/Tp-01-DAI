import express from "express";
import {EventLocationService} from "../servicios/eventLocation-service.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const router = express.Router();
const eventLocationService = new EventLocationService();

router.get("/", AuthMiddleware , async (request, response) => {
    try {
      const evLocByUser = await evLocService.getEventLocationsByUser(request.user.id);
      if (evLocByUser!=null) {
        return response.status(200).json(evLocByUser);
      }else{
        return response.status(401).json("este usuario no creo ninguna event location");
      }
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
});

router.get("/:id", AuthMiddleware , async (request, response) => {
    const id = request.params.id;
    try {
      const evLocById = await eventLocationService.getEventLocationById(id);
      if (evLocById!=null) {
        return response.status(200).json(evLocById);
      }else{
        return response.status(401).json("No existe la id");
  
      }
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
});  

router.post("/",AuthMiddleware, async (request,response)=>{
    const EventLocation={}
    EventLocation.id_location=request.body.id_location;
    EventLocation.name=request.body.name;
    EventLocation.full_adress=request.body.full_adress;
    EventLocation.max_capacity=request.body.max_capacity;
    EventLocation.latitude=request.body.latitude;
    EventLocation.longitude=request.body.longitude;
    EventLocation.id_creator_user=request.user.id;

    try {
        const respuesta = await eventLocationService.InsertEvLoc(Evento);;
        return response.json(respuesta);
    } catch (error) {
        console.log(error);
        return response.json(error);
    }

});


export default router;