import express from "express";
import {UserService} from "../servicios/user-service.js"

const router = express.Router();
const userService = new UserService();

router.post("/login", async (request, response) => {
  const pass = request.body.password;
  const user = request.body.username;
  try {
    const token = await userService.login(user, pass);
    if(token!="Usuario y/o Contraseña inexistentes"){
    return response.status(200).json({
      "succes":true,
      "message":"Has iniciado sesion",
      "token":token});
    }else{
      return response.status(401).json({
        "success":false,
        "message":"Error",
        "token":""});
    }
  } catch (error) {
    return response.json(error);
  }
});

router.post("/register", async (request, response) => {
  const user = {};
  user.first_name = request.body.first_name;
  user.last_name = request.body.last_name;
  user.username = request.body.username;
  user.password = request.body.password;

  const mailish = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (user.first_name!=null && user.last_name!=null && user.password!=null && user.username!=null) {

      if(user.first_name.length>=3 && user.last_name.length>=3 && user.password.length>=3){

        if(mailish.test(user.username)){
          
           await userService.register(user);
           return response.status(201).send("Mail registrado");
  
        }else{
          return response.status(400).json("Mail incorrecto");
        }
      }else{
        return response.status(400).json("Nombre, apellido y contraseña deben tener más de 3 caracteres");
      }
    }else{
      return response.status(400).json("Error, datos incompletos");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;