export default async function(token){
    const secretKey = "Huevo2007";
    var payloadOrginal = null;

    try{
        payloadOrginal = await jwt.verify(token, secretKey);  
    }catch (e){
        console.error(e)
    }
    console.log(payloadOrginal);
}