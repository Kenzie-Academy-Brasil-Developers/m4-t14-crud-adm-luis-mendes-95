import { QueryConfig } from "pg"
import format from "pg-format"
import { client } from "../../database"
import { IUserResult, IUserWithoutPassword } from "../../interfaces/users.interfaces"

const patchUserService = async (userId: number, userData: string[], userKeys: string[]): Promise<IUserWithoutPassword> => {
	
    const formatString: string = format(
      `
			UPDATE
				users
			SET(%I) = ROW(%L)
			WHERE
				id = $1
			RETURNING *;
		`,
		userKeys,
		userData
    );

    const queryConfig: QueryConfig = {
      text: formatString,
      values: [userId],
    };

    const queryResult: IUserResult = await client.query(queryConfig);

    return queryResult.rows[0]
}

export default patchUserService