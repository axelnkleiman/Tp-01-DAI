import pg from "pg";
import { BDConfig } from "../DB/db.js";

export default class CategoryRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDConfig);
    this.BDclient.connect();
  }
  async cantCategories(){
    try {
        var sql = "SELECT COUNT(*) FROM event_categories"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
  }

  async getCategories(limit, offset){
    let enity=null;
    try{
        const sql="SELECT * FROM event_categories order by id limit $1 offset $2";
        const values=[limit, offset];
        const result=await this.BDclient.query(sql,values);
        enity=result.rows;
    }catch(error){
        console.log(error)
    }
    return enity;
}

async getCategoryById(id){
    let enity=null;
    try{
        const sql = "SELECT * FROM event_categories WHERE id=$1";
        const values = [id];
        const result = await this.BDclient.query(sql,values);
        enity = result.rows;
    }catch(error){
        console.log(error)
    }
    return enity;
}

async insertCategory(category){
    try{
        const sql="INSERT INTO event_categories (name, display_order) VALUES ($1, $2)";
        const values=[category.name, category.display_order];
        await this.BDclient.query(sql,values);
    }catch(error){
        console.log(error)
    }
}

async updateCategory(category){
    try {
        var sql = "UPDATE event_categories SET "
        var index = 2;
        const values = [category.id]

        if (category.name != null) {
            sql += `name = $${index},`
            values.push(category.name)
            index++;
        }

        if (category.display_order != null) {
            sql += `display_order = $${index}`
            values.push(category.display_order)
            index++;
        }
        if (sql.endsWith(",")) {
            sql = sql.slice(0, -1);
        }
        sql += " WHERE id=$1"
        await this.BDclient.query(sql,values);
    } catch (error) {
        console.log(error);
    }
}

async deleteCategory(id){
    try {
        const sql = `Delete FROM event_categories WHERE id=$1`;
        const values = [id];
        const result = await this.BDclient.query(sql, values);
        console.log(result)
        } catch (error) {
        console.log(error);
        }
}
}