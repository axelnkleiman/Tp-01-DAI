import UserRepository from "../repositorios/user-repository.js";
import login from "../auth/login.js";
const repository = new UserRepository();

const ListadoUsers = {
  collection: [
    {
      user: {
        id: 1,
        username: "LeoMessi",
        first_name: "Lionel",
        last_name: "Messi",
      },
      attended: true,
      rating: 3,
      description: "bueno",
    },
    {
      user: {
        id: 2,
        username: "JRR10",
        first_name: "JuanRoman",
        last_name: "Riquelme",
      },
      attended: false,
      rating: null,
      description: null,
    },
  ],
};

export class UsuarioService {
  async login(user, pass) {
    try{
    const usuario= await this.getUserByPayload(user,pass)
    if(usuario!=null){
      const token =await login(usuario)
      return token;
    }else{
      return "Usuario y/o Contraseña inexistentes";
    }
    }catch(error){
      console.log(error);
      return res.json(error);
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