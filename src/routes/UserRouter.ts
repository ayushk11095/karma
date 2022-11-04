import { Router } from "express"
import { addUser, findAll, findOne } from "../controllers/userController"

const router = Router()

router.post("/", addUser)
router.get("/:id", findOne)
router.get("/", findAll)

export default router
