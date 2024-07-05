import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function generarToken(usuario) {
    const options = {
        expiresIn:"4h",
        issuer: "axelnk.facumy",
    };

    const payload = {"id":usuario.id};

    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    console.log(token)
    return token;
}