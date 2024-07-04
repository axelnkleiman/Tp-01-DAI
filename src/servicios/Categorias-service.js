import { query } from "express";
import CategoryRepository from "../repositorios/categorias-repository.js"
import { Pagination } from "../utils/Paginacion.js";

const PaginacionConfig = new Pagination();
const repository= new CategoryRepository();

export class CategoryService{

    async getCategories(limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad = Number.parseInt(await repository.cantCategories())
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/categoria`)
        const categories = await repository.getCategories(parsedLimit,parsedOffset)

        const collection={categories,paginacion}
        return collection;  
    }

    async getCategoryById(id){
        return repository.getCategoryById(id);
    }
    
    async insertCategory(Category){
        repository.insertCategory(Category);
        return "Categoria insertada correctamente";
    }

    async updateCategory(category){
        repository.updateCategoria(category);
        return "Categoria actualizada correctamente";
    }

    async deleteCategoria(id){
        repository.deleteCategoria(id);
        return "Categoria eliminada correctamente";
    }
}