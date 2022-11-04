import { Request, Response, NextFunction } from "express";
const User = require("../models/userModel")

export default {
    addUser, findOne, findAll
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
    const {email, name} = req.body
    try {
        const user = new User()
        user.name = name
        user.email = email
        user.user_id = 1
        const data = await user.save()

        res.json({
            success: true,
            message: `User added successfully.`,
            data
        })
    } catch (error) {
        return next(error)
    }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id
    try {
        const data = await User.findOne({_id})
        if (!data) {
            return next({
                status: 404,
                code: `invaild_id`,
                message: 'User not found'
            })
        }
        
        res.json({
            success: true,
            message: `User fetched successfully.`,
            data
        })
    } catch (error) {
        return next(error)
    }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await User.find({}).select('name email')
        
        res.json({
            success: true,
            message: `User fetched successfully.`,
            data
        })
    } catch (error) {
        return next(error)
    }
}