import { QueryResult } from "pg"
import { z } from 'zod'
import { createUserSchema, returnUserSchema, returnUserSchemaWithoutPassword, allUsersSchema } from "../schemas/users.schemas"

type IUserRequest = z.infer<typeof createUserSchema>

type IUser = z.infer<typeof returnUserSchema>

type IUserWithoutPassword = Omit<IUser, 'password'>
type IUserResult = QueryResult<IUserWithoutPassword>

type IAllUsersReturn = z.infer<typeof allUsersSchema>

type IUserResultWithPassword = QueryResult<IUser>


export {
	IUserRequest,
	IUser,
	IUserWithoutPassword,
	IUserResult,
	IAllUsersReturn,
	IUserResultWithPassword
}