import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import {
  createUserSchema,
  returnUserSchemaWithoutPassword,
} from "../../schemas/users.schemas";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const queryString: string = format(
    `
			  INSERT INTO
				  users(%I)
			  VALUES(%L)
			  RETURNING *;
		  `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;
