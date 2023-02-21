import { Response, Request, NextFunction } from 'express'
import { AppError } from '../errors'
import jwt from 'jsonwebtoken'

const ensureIsAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization!.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {

        if(error){
            throw new AppError(error.message, 401)
        }

        if (decoded.admin === false) {
            throw new AppError('Must be admin to access this resource', 403)
        }

        return next()

    })
}

export default ensureIsAdminMiddleware