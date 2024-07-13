import db from '@db/client';
import { decode, sign, verify } from 'hono/jwt'
import { UserDTO, UserRegisterDTO } from '../@types/AuthTypes';

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const GetUserByEmail = async (email: string) => {
    const user = await db.user.findFirst({
        where: {
            email
        }
    });
    return user;
};

const GetUserByUsername = async (username: string) => {
    const user = await db.user.findFirst({
        where: {
            username
        }
    });
    return user;
}

const InsertUser = async (data: UserRegisterDTO) => {
    const { email, username, password, name } = data;
    const user = await db.user.create({
        data: {
            email,
            username,
            password,
            name,
            created_at: new Date(),
            updated_at: new Date()
        }
    });
    return user;
};

const GenerateAuthToken = async (data: UserDTO) : Promise<string> => {
    const expirationDuration = 60 * 60 * 12;
    const payload = {
        user_id: data.id,
        email: data.email,
        username: data.username,
        name: data.name,
        exp: Math.floor(Date.now() / 1000) + expirationDuration
    }
    const key = await sign(payload, PRIVATE_KEY);
    return key;
};

const GenerateUserProfile = (user: UserDTO): object => {
    return {
        email: user.email,
        username: user.username,
        name: user.name
    }
}

export default {
    GetUserByEmail,
    InsertUser,
    GenerateAuthToken,
    GenerateUserProfile,
    GetUserByUsername
};
