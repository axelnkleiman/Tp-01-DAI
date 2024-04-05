import express from "express";
import EventService from "../servicios/event-service.js";

const router = express.Router();
const eventSevice = new EventService();

router.get("/", (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;

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