import express from "express";
import { EventService } from "../servicios/event-service.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const router = express.Router();
const eventService = new EventService();

const esFecha = (fecha) => {
  const patron = /^\d{4}-\d{2}-\d{2}$/;
  const numeros = /^\d+$/;
  
  return patron.test(fecha) && numeros.test(fecha.replace(/-/g, ''));
}

router.get("/" , async (request, response) => {
  const Event = {};
  const limit = request.query.limit; 
  const offset = request.query.offset;
  Event.name = request.query.name;
  Event.category = request.query.category;
  Event.startDate = request.query.startDate;
  Event.tag = request.query.tag;
  
  try {
    if (esFecha(Event.startDate) || Event.startDate == undefined) {
      const allEvents = await eventService.getEventByFilter(Event, limit, offset);
      console.log(allEvents);
      return response.send(allEvents);
    } else {
      return response.json("error en los filtros");
    }
  } catch (error) {
    console.log(error);
    return response.json("a");
  }
});

router.delete("/:id", AuthMiddleware , async (request, response) => {
  const id = request.params.id;
  try {
    await eventService.deleteEvent(id);
    return response.send("Se ha borrado con exito");
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.post("/",AuthMiddleware, async (request, response) => {
  const Event = {};
  Event.name = request.query.name;
  Event.description = request.query.description;
  Event.id_event_category = request.query.id_event_category;
  Event.id_event_location = request.query.id_event_location;
  Event.start_date = request.query.start_date;
  Event.duration_in_minutes = request.query.duration_in_minutes;
  Event.price = request.query.price;
  Event.enabled_for_enrollment = request.query.enabled_for_enrollment;
  Event.max_assistance = request.query.max_assistance;
  Event.id_creator_user = request.user.id;
  
  try {
    const respuesta = await eventService.insertEvent(Event);
    return response.json(respuesta);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.put("/",AuthMiddleware, async (request, response) => {
  const Event = {};
  Event.name = request.query.name;
  Event.description = request.query.description;
  Event.start_date = request.query.start_date;
  Event.duration_in_minutes = request.query.duration_in_minutes;
  Event.price = request.query.price;
  Event.enabled_for_enrollment = request.query.enabled_for_enrollment;
  Event.max__assistance = request.query.max__assistance;
  Event.id = request.query.id;
  try {
    const respuesta = await eventService.patchEvento(Event);
    return response.json(respuesta);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const detalleEvent = await eventService.detalleEvent(id);
    if (detalleEvent!=null) {
      return response.status(200).json(detalleEvent);
    }else{
      return response.status(404).json("No se encuentra el id");
    }
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.get("/:id/enrollment", async (request, response) => {
  const enrollment = {};
  enrollment.id = request.params.id;
  enrollment.name = request.query.name;
  enrollment.firstName = request.query.firstName;
  enrollment.lastName = request.query.lastName;
  enrollment.username = request.query.username;
  enrollment.attended = request.query.attended;
  enrollment.rating = request.query.rating;

    try {
      const x = await eventService.getEventEnrollment(enrollment);
      return response.json(x);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
});

router.post("/:id/enrollment", AuthMiddleware , async (request, response) => {
  const enrollment = {};
  const event = await eventService.getEventById(request.params.id)
  enrollment.id = request.params.id;
  enrollment.attended = request.query.attended;
  enrollment.rating = request.query.rating;
  enrollment.descripcion = request.query.descripcion;
  enrollment.observations = request.query.observations;
  enrollment.user_id = request.user.id; 
  enrollment.enabled = event.enabled_for_enrollment

  try {
    await eventService.inscripcionEvent(enrollment);
    return response.json("Inscripto correctamente");
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.put("/:id/enrollment",AuthMiddleware,async (request, response) => {
  const id = request.params.id;
  const rating = request.query.rating;
  try {
    const mensaje = await eventService.updateRating(id, rating);
    return response.status(200).send(mensaje);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

export default router;