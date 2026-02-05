const rateLimit=require('express-rate-limit');
const Schema=require('./Schema.js');
const ExpressError=require('./utils/ExpressError.js');

module.exports.validateNotes=(req,res,next)=>{
    let {title,content}=req.body;
    title = title.trim();
    content = content.trim();

    if (!title || !content) {
        throw new ExpressError(400, "Title and Content cannot be empty");
    }

    let {error}=Schema.validate({title,content});

    if(error){
        let errMsg=error.details.map(msg=>msg.message).join(',')
        throw new ExpressError(401,errMsg);
    }

    next();
}

module.exports.noteLimiter=(rateLimit({
    windowMs:60*1000,
    max:5,
    message:"To many notes created. Try again after a minute"
}));