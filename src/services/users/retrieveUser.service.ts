import { QueryConfig, QueryResult } from 'pg'
import { IUserWithoutPassword, IUserResult } from '../../interfaces/users.interfaces'
import { client } from '../../database'
import { AppError } from '../../errors'

const retrieveUserService = async (userId: number): Promise<IUserWithoutPassword> => {

	const queryString: string = `
		SELECT
		     *
		FROM
		     users
		WHERE
		     id = $1;
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [userId]
	}		

	const queryResult: QueryResult = await client.query(queryConfig)

	return queryResult.rows[0]

}

export default retrieveUserService