const jwt=require("jsonwebtoken");
const signKey=process.env.jwtSigningToken;

console.log(signKey);
const generateToken=(payload)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const token=await jwt.sign({payload:payload},jwtSigningToken);
            resolve(token);
        }catch(err){
            console.log(err);
            resolve(-1);
        }
    });
}

const decodeToken=(token)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const payload=await jwt.verify(token,signKey);
            resolve(payload);
        } catch (error) {
            console.log(err);
            resolve(-1);
        }
    });
}

module.exports={
    generateToken,
    decodeToken
}