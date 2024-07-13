import { Logger } from '@utils/logger';
import AuthService from '../service/AuthService';
import { isEmpty } from 'lodash';
import { ResponseContext } from '@interface/ResponseContext';
import { UserDTO, UserLoginDTO, UserRegisterDTO } from '../@types/AuthTypes';

const Namespace = 'AuthController';

const Register = async (ctx: ResponseContext) => {
    try {
        const body: UserRegisterDTO = await ctx.req.json();
        const user = await AuthService.GetUserByEmail(body.email);

        if (!isEmpty(user)) {
            return ctx.badRequest('User already exists');
        }

        const createdUser = await AuthService.InsertUser(body);
        const token = await AuthService.GenerateAuthToken(
            createdUser as UserDTO
        );
        const userProfile = AuthService.GenerateUserProfile(
            createdUser as UserDTO
        );

        const response = {
            token,
            profile: userProfile
        };

        Logger.info(
            `[Controller::${Namespace}] Registering user: ${body.email}`
        );
        return ctx.success('User registered', response);
    } catch (error: any) {
        Logger.error(`[Controller::${Namespace}] Error: ${error.message}`);
        return ctx.internalServerError();
    }
};

const Login = async (ctx: ResponseContext) => {
    try {
        const body: UserLoginDTO = await ctx.req.json();
        const user = await AuthService.GetUserByUsername(body.username);

        if (isEmpty(user)) {
            return ctx.badRequest('User not found');
        }

        const token = await AuthService.GenerateAuthToken(user as UserDTO);
        const userProfile = AuthService.GenerateUserProfile(user as UserDTO);

        const response = {
            token,
            profile: userProfile
        };

        Logger.info(`[Controller::${Namespace}] Logging in user: ${body.username}`);
        return ctx.success('User logged in', response);
    } catch (error: any) {
        Logger.error(`[Controller::${Namespace}] Error: ${error.message}`);
        return ctx.internalServerError();
    }
}

export default {
    Register,
    Login
};
