import { NextFunction, Request, Response } from 'express'
import { QueryConfig, QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../errors'
import { IUserRequest } from '../interfaces/users.interfaces'


const checkEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userData: IUserRequest = req.body

    const queryStringUserExist: string = `
    SELECT
        *
    FROM
        users
    WHERE
        email = $1;
`;

const queryConfigUserExists: QueryConfig = {
text: queryStringUserExist,
values: [userData.email],
};

const queryResultUserExists: QueryResult = await client.query(
queryConfigUserExists
);

if (queryResultUserExists.rowCount > 0) {
throw new AppError("E-mail already registered", 409);
}

return next()

}



export default checkEmailExistsMiddleware