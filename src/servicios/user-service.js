import UserRepository from "../repositorios/user-repository.js";
import generarToken from "../auth/token.js";

const repository = new UserRepository();

export class UserService {
  async generarToken(user, pass) {
    try{
    const usuario= await this.getUserByPayload(user, pass)
    if(usuario!=null){
      const token =await generarToken(usuario)
      return token; 
    }else{
      return "Usuario y/o Contraseña inexistentes";
    }
    }catch(error){
      console.log(error);
      return response.json(error);
    }
  }

  async register(user) {
    await repository.InsertUser(user)
  }

  async getUserByPayload(user,pass){
    return await repository.getUserByName(user,pass)
  }

  async getUserById(id){
    return await repository.getUserById(id);
  }
};