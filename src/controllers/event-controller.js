import express from "express";
import {EventService} from "../servicios/event-service.js";
import { AuthMiddleware } from "../auth/authmiddleware.js";

const router = express.Router();
const eventSevice = new EventService();

router.get("/", AuthMiddleware, (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    request.user;

    try{
        const allEvents = eventSevice.getAllEvents(limit, offset);
        return response.json(allEvents);
    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});

router.get("/", (request, response) =>{
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;

     try{
        const eventFiltros = eventSevice.getEventsConFiltro(pageSize, page, name, category, startDate, tag);
        return response.json(eventFiltros);
    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});

router.get("/:id", (request, response) =>{
    const name = request.query.name;
    const description = request.query.description;
    const start_date = request.query.startDate;
    const duration_in_minutes = request.query.duration_in_minutes;
    const price = request.query.price;
    const enabled_for_enrollment = request.query.enabled_for_enrollment;
    const max_assistance = request.query.max_assistance;

    try{
        const detalleEvent = eventSevice.DetallarEvent(name, description, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance);
        return response.json(detalleEvent);
    } catch(error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});
router.post("/", (request, response) => {
    const body = request.body;
    return response.status(201).send({
        page: body.page,
        pageSize: body.pageSize,
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        attended: body.attended,
    });
});

router.delete("/:id", (request, response) => {
    const id = request.params.id;
    console.log(id);
    return response.send("Ok!");
  });

  router.post("/events/:id/enrollment", (request, response) => {
    const body = request.body;
    return response.status(201).send({
        first_name: body.first_name,
        last_name : body.last_name,
        username: body.username,
        password: body.password,
    })
});

router.get("/:id/enrollment", (request, response) =>{
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const first_name = request.query.first_name;
    const last_name = request.query.last_name;
    const username = request.query.username;
    const attended = request.query.attended;

    try{
        const userFiltro = eventSevice.getUserConFiltro(pageSize, page, first_name, last_name, username, attended);
        return response.json(userFiltro);
    } catch(error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});

export default router;