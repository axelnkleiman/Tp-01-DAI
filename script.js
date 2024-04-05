import express from "express";
import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";


const app = express(); 
app.use(express.json()); 
const port = 3000;


app.use("/events", EventController);
app.use("/user", UserController);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });