import { ResponseContext } from '@interface/ResponseContext';
import { Next } from 'hono';

export const ResponseMiddleware = async (ctx: ResponseContext, next: Next) => {
    ctx.success = (message?: string, data?: any) => {
        return ctx.json(
            {
                status: true,
                message: message ?? 'Success',
                data: data
            },
            200
        );
    };

    ctx.badRequest = (message: string | null = null) => {
        return ctx.json(
            {
                status: false,
                message: message ?? 'Bad Request'
            },
            400
        );
    };

    ctx.unauthorized = () => {
        return ctx.json(
            {
                status: false,
                message: 'Unauthorized'
            },
            401
        );
    };

    ctx.internalServerError = (message?: string) => {
        return ctx.json(
            {
                status: false,
                message: message ?? 'Internal Server Error'
            },
            500
        );
    }

    await next();
};
