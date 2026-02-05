const Joi = require('joi');

// const schema=Joi.object({
//     title:Joi.string().required().invalid(null,''),
//     content:Joi.string().required().invalid('', ' '," ",""),
// })


const schema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'string.empty': ' Title cannot be empty or just whitespace',
        }),
        
    content: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': ' Content cannot be empty or just whitespace',
        })
});


module.exports=schema;