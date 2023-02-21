import { Request, Response } from 'express'
import createUsersService from '../services/users/createUsers.service'
import { IUserRequest } from '../interfaces/users.interfaces'
import retrieveUserService from '../services/users/retrieveUser.service'
import deleteUserService from '../services/users/deleteUser.service' 
import patchUserService from '../services/users/patchUser.service'
import listUsersService from '../services/users/listUsers.service'
import activateUserService from '../services/users/activateUser.service'
import retrieveUserProfileService from '../services/users/retrieveUserProfile.service'

const createUsersController = async (req: Request, res: Response): Promise<Response> => {

	const userData: IUserRequest = req.body

	const newUser = await createUsersService(userData)

	return res.status(201).json(newUser)	

}

const retrieveUserController = async (req: Request, res: Response): Promise<Response> => {
	
		const userId: number = parseInt(req.params.id)
	
		const user = await retrieveUserService(userId)
	
		return res.json(user)
	
}

const retrieveUserProfileController = async (req: Request, res: Response): Promise<Response> => {
	
		let token = req.headers.authorization!.split(' ')[1]

		const result = retrieveUserProfileService(token)
				
		return res.status(200).json(result)
	
}

const patchUserController = async (req: Request, res: Response): Promise<Response> => {

	const userData: string[] = Object.values(req.body);
    const userKeys: string[] = Object.keys(req.body);
	
	const userId: number = parseInt(req.params.id)

	const result = await patchUserService(userId, userData, userKeys)

	return res.status(200).json(result)
	
}

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
	
	const userId: number = parseInt(req.params.id)

	await deleteUserService(userId)

	return res.status(204).send()
	
}

const activateUserController = async (req: Request, res: Response): Promise<Response> => {
	
	const userId: number = parseInt(req.params.id)

	await activateUserService(userId)

	return res.status(204).send()
	
}

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
	
	const users = await listUsersService()

	return res.json(users)
}

export {
	createUsersController,
	retrieveUserController,
	deleteUserController,
	listUsersController,
	retrieveUserProfileController,
	patchUserController,
	activateUserController
}