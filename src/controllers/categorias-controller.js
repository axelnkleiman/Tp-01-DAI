/*import express from "express";
import { CategoriaService } from "../servicios/categorias-service";
import AuthMiddleware from "../auth/authmiddleware";

const router = express.Router();
const categoriaService = new CategoriaService();

router.get("/", AuthMiddleware, (request, response) =>{
    const pageSize = request.query.pageSize;
    const page = request.query.page;
    const id = request.query.id;
    const name = request.query.name;
    const display_order = request.query.display_order;

    try{
        const allCategorias = categoriaService.GetAllCategories(pageSize, page, id, name, display_order);
        return response.status(200).send;

    } catch (error){
        console.log("ERROR");
        return response.json("ERROR");
    } 
});


export default router;*/