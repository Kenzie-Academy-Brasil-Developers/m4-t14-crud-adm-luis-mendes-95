import { z } from 'zod'
import { hashSync } from 'bcryptjs'

const createUserSchema = z.object({
    name: z.string().min(3).max(45),
	email: z.string().email(),
	password: z.string().transform((pass)=>{
		return hashSync(pass, 10)
	}),
	admin: z.boolean()
})

const returnUserSchema = createUserSchema.extend({
    id: z.number(),
	active: z.boolean()
})

const patchUserSchema = z.object({
    name: z.string().min(3).max(45),
	email: z.string().email(),
	password: z.string().transform((pass)=>{
		return hashSync(pass, 10)
	})
})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

const allUsersSchema = z.array(returnUserSchema)

export {
	createUserSchema,
	returnUserSchema,
	returnUserSchemaWithoutPassword,
	allUsersSchema,
	patchUserSchema
}
