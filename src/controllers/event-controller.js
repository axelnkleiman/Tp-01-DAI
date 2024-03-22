import express from "express";
import EventService from "../servicios/event-service.js";

const router = express.Router();
const eventSevice = new EventService();

router.get("/event", (request, response) => {
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

router.get("/event", (request, response) =>{
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;

    try{
        const allEvents = eventSevice.getEventsConFiltro(pageSize, page, name, category, startDate, tag)
    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});

export default router;