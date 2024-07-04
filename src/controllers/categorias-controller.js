import express from "express";
import { CategoryService } from "../servicios/Categorias-service.js";
import AuthMiddleware from "../auth/authmiddleware.js";

const categoryService = new CategoryService();
const router = express.Router();

router.get("/", async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    try {
      const category = await categoryService.getCategory(limit,offset);
      return response.status(200).json(category);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  router.get("/:id", async (request, response) => {
    const id = request.params.id;
    try {
      const categoryById = await categoryService.getCategoryById(id);
      if (categoryById!=null) {const category = {};
      category.name = request.query.name;
      category.display_order = request.query.display_order;

      if ((category.name != null || category.display_order || null)) {
        
      }
        return response.status(200).json(categoryById);
      }else{
        return response.status(404).json("La id no existe");
      }
    }
    catch(error){
      console.log(error);
    }
  })

  router.post("/", AuthMiddleware, async (request, response) => {
    const Category = {};
    Category.name = request.query.name;
    Category.display_order = request.query.display_order
    
    if (Category.name != null) {
      try {
        const respuesta = await categoryService.insertCategory(Category);;
        return response.status(201).json(respuesta);
      } catch (error) {
        console.log(error);
        return response.status(402).json(error);
      }
  } else return response.status(400).json("Vacio");
  });

  router.patch("/", AuthMiddleware, async (request, response) => {
    const category = {};
    category.name = request.query.name;
    category.display_order = request.query.display_order;
    category.id = request.query.id;

    if ((category.name != null || category.display_order || null) && category.id != null) {
      try {
        const respuesta = await categoryService.updateCategoria(category);
        return response.status(200).json(respuesta);
      } catch (error) {
        return response.status(400).json(error);
      }
    } else response.status(404).json("Datos erroneos");
  })

  router.delete("/:id", AuthMiddleware, async (request, response) => {
    const id = request.params.id;
    try {
        const respuesta = await categoryService.deleteCategoria(id)
        return response.status(200).json(respuesta)
      } catch (error) {
        return response.status(404).json("Id no encontrado");
      }
  });

  export default router;