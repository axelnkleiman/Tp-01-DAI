import express from "express";
import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciaController from "./src/controllers/provincia-controller.js";
import LocationController from "./src/controllers/location-controller.js";
import CategoriaController from "./src/controllers/categorias-controller.js";
import EventLocationController from "./src/controllers/eventLocation-controller.js";

const app = express(); 
app.use(express.json()); 
const port = 3000;

app.use("/api/event", EventController);
app.use("/api/user", UserController);
app.use("/api/provincia", ProvinciaController);
app.use("/api/location", LocationController);
app.use("/api/categories", CategoriaController);
app.use("/api/eventLocation", EventLocationController);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});