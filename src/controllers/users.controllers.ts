import { Request, Response } from 'express'
import createUsersService from '../services/users/createUsers.service'
import { IUserRequest } from '../interfaces/users.interfaces'


const createUsersController = async (req: Request, res: Response): Promise<Response> => {

	console.log('aqui chega')

	const userData: IUserRequest = req.body

	const newUser = await createUsersService(userData)

	return res.status(201).json(newUser)	
	
}

export {
	createUsersController
}