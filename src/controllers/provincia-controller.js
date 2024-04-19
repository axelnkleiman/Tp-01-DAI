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
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const name = request.query.name;
    const full_name = request.query.full_name;
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;
    const display_order = request.query.display_order;

    try{
        const provincia = provinciaService.getProvincia(pageSize, page, name, full_name, latitude, longitude, display_order);
    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    } 
});

export default router;