import DecryptToken from './jwt.js';

export function AuthMiddleware(req, res, next){
    if(!req.headers.authorization){
        req.status(401).send('Forbidden');
    } else{
        const token = req.headers.authorization.split(' ')(1);
        const decryptedToken = DecryptToken(token);
        req.user = decryptedToken.payload;
    }

    next();
}