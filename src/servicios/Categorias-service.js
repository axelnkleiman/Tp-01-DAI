import CategoryRepository from "../repositorios/categorias-repository.js"
import {Paginacion, PaginationDto} from "../utils/paginacion.js";

const PaginacionConfig = new Paginacion();
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
        repository.updateCategory(category);
        return "Categoria actualizada correctamente";
    }

    async deleteCategory(id){
        repository.deleteCategory(id);
        return "Categoria eliminada correctamente";
    }
}