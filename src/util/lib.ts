// validation 
import { Request, Response, NextFunction } from "express"
import Joi from "joi"

export const packageCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const authSchema = Joi.object().keys({
        userUID: Joi.string().required(),
        name: Joi.string().required(),
        clientID: Joi.string(),
    })
    //input body 
    const body = {
        ...req.body
    }
    // validate
    const { error } = authSchema.validate(body)
    if (error) {
        return res.status(406).json(`ERROR : ${error.message}`)
    } else {
        next()
    }
}
