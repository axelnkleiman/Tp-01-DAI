import express from "express";
import {UserService} from "../servicios/user-service.js";

const router = express.Router();
const userService = new UserService();

router.get("/event_enrollments", (request, response) =>{
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const first_name = request.query.first_name;
    const last_name = request.query.last_name;
    const username = request.query.username;
    const attended = request.query.attended;

    try{
        const users = userService.getUserConFiltro(pageSize, page, first_name, last_name, username, attended)
    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    }
});

router.post("/login", (request, response) =>{
    const body = request.body;
    return response.status(201).send({
        username: body.username,
        password: body.password
    })
});
router.post("/register", (request, response) =>{
    const body = request.body;
    return response.status(201).send({
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        password: body.password,
    })
});

export default router;