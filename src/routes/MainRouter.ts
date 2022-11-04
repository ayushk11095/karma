import { Router } from "express"
import {
    userRouter
} from "."

const router = Router()

router.use("/user", userRouter)

export default router