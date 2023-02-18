import { Router } from 'express'
import { createUsersController } from '../controllers/users.controllers'

const userRoutes: Router = Router()

userRoutes.post('/users', createUsersController)
// userRoutes.post('', função)

export default userRoutes