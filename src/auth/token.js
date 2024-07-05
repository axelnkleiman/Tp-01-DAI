import jwt from "./jwt.js";
import "dotenv/config";

export default async function generarToken(usuario) {
    const options = {
        expiresIn:"4h",
        issuer: "axelnk.facumy",
    };

    const payload = {
        id: usuario.id,
        username: usuario.username,
    };


    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    return token;
}