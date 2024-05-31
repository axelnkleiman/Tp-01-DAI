import express from "express";
import {LocationService} from "../servicios/location-service.js";
import { AuthMiddleware } from "../auth/authmiddleware.js";

const router = express.Router();
const locationSevice = new LocationService();

router.get("/", (request, response) =>{
    const page = request.query.page;
    const pageSize = request.query.pageSize;

    try{
        const allLocations = locationSevice.getAllLocations(page, pageSize);
        return response.status(200).send;
    }catch(error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});
router.get("/:id", (request, response) =>{
    const page = request.query.page;
    const pageSize = request.query.pageSize;
    const id = request.params.id;
    
    try{
        const getLocationId = locationSevice.GetLocationId(page, pageSize, id);
        return response.status(200).send;
    }catch(error){
        console.log("ERROR");
        return response.status(404).send;
    }
});
router.get("/:id", AuthMiddleware, (request, response) =>{
        
})

export default router;