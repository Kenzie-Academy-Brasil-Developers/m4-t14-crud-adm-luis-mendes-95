import { Router } from 'express'
import { createLoginController } from '../controllers/login.controllers'
import { createLoginSchema } from '../schemas/login.schemas'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'

const loginRoutes: Router = Router()

loginRoutes.post('', ensureDataIsValidMiddleware(createLoginSchema), createLoginController)

export default loginRoutes