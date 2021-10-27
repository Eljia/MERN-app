const { body, validationResult } = require('express-validator');

const registerRules=()=>[
    body('name',"name is required").notEmpty(),
    body('lastName',"lastName is required").notEmpty(),
    body('email',"email is not valid").isEmail(),
    body('password',"password must be 6 carts").isLength({
        min:6,max:20,
    }),

]
const loginRules=()=>[
    
    body('email',"email is not valid").isEmail(),
    body('password',"password must be 6 carts").isLength({
        min:6,max:20,
    }),

]
const costumeError=(errorarray)=>errorarray.map((err)=>({msg:err.msg}))

const validator=(req,res,next)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(costumeError(errors.array()));
    }
    else next();

}

module.exports={registerRules,loginRules,validator}