import DecryptToken from "../auth/jwt.js"

export default async function AuthMiddleware (request ,response ,next){
    if(!request.headers.authorization){
        response.status(401).send("No tenes acceso");

    }else{
        const token =request.headers.authorization.split(' ')[1];
        const payload=await DecryptToken(token);
        if(payload!=null){
            request.user=payload;
            next();
        }else{
            response.status(401).send("error") ;
        }
    }

}