import { IUserWithoutPassword } from '../../interfaces/users.interfaces'
import jwt from 'jsonwebtoken'

const retrieveUserProfileService = async (token: string): Promise<IUserWithoutPassword | any> => {

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {

		return decoded
	})

}

export default retrieveUserProfileService