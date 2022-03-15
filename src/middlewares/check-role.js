module.exports =(role, req, res, next)=>{
    if(role !=req.body.role){
       res.status(401).send({message:"Unauthorised!"})
    }
 
    next();
 }