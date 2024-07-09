import express, { request, response } from "express";
import { EventService } from "../servicios/event-service.js";
import AuthMiddleware from "../auth/authmiddleware.js";

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
      const allEvents = await eventService.getAllEvents (Event, limit, offset);
      console.log(allEvents);
      return response.send(allEvents);
    } else {
      return response.json("error en los filtros");
    }
  } catch (error) {
    console.log(error);
    return response.json("error");
  }
});

router.delete("/:id", AuthMiddleware , async (request, response) => {
  const id = request.params.id;
  try {
    const tags = await eventService.getEvent_TagsById(id);
    const enrollment = await eventService.getEvent_EnrollmentById(id);
    console.log(tags)
    console.log(enrollment)
    if(tags == null && enrollment == null){
      await eventService.deleteEvent(id);
      return response.send("Se elimino correctamente")
    }else{
      return response.send("Este evento tiene tags y/o enrollments");
    }
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.post("/",AuthMiddleware, async (request, response) => {
  const Event = {};
  Event.name = request.body.name;
  Event.description = request.body.description;
  Event.id_event_category = request.body.id_event_category
  Event.id_event_location = request.body.id_event_location
  Event.start_date = request.body.start_date;
  Event.duration_in_minutes = request.body.duration_in_minutes;
  Event.price = request.body.price;
  Event.enabled_for_enrollment = request.body.enabled_for_enrollment;
  Event.max_assistance = request.body.max_assistance;
  Event.id_creator_user = request.user.id; 
  
  try {
    console.log(Event.max_assistance + "asdad");
    console.log(Event.enabled_for_enrollment + "asdad");
    const respuesta = await eventService.insertEvent(Event);
    return response.json(respuesta);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

router.put("/",AuthMiddleware, async (request, response) => {
  const Event = {};
  Event.name = request.body.name;
  Event.description = request.body.description;
  Event.start_date = request.body.start_date;
  Event.duration_in_minutes = request.body.duration_in_minutes;
  Event.price = request.body.price;
  Event.enabled_for_enrollment = request.body.enabled_for_enrollment;
  Event.max__assistance = request.body.max__assistance;
  Event.id = request.body.id;
  try {
    const respuesta = await eventService.patchEvent(Event);
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
      const result = await eventService.getEventEnrollment(enrollment);
      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
});

router.delete("/:id/enrollment", AuthMiddleware, async (request, response) => {
  const id = request.params.id;
  try{
    const event = await eventService.deleteEventEnrollment(id);
    return response.json("Enrollment eliminado");
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
})

router.post("/:id/enrollment", AuthMiddleware , async (request, response) => {
  const enrollment = {};
  const date = new Date();
    enrollment.id_event = request.params.id;
    enrollment.id_user = request.user.id;
    enrollment.descripcion = request.body.descripcion;
    enrollment.registration_date_time = new Date().toISOString();
    console.log(enrollment.registration_date_time)
    enrollment.attended = request.body.attended;
    const event = await eventService.detalleEvent(enrollment.id_event)
    console.log(event)

  try {
    if(event.enabled_for_enrollment){
      await eventService.inscripcionEvent(enrollment);
      return response.status(201).send("Inscripto correctamente");
    }else{
      return response.status(404).send("No estas habilitado para inscribirte");
    }
  } catch (error) {
    console.log(error);
    return response.status(404).json(error);
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