import { ResponseContext } from "@interface/ResponseContext";
import { Next } from "hono";
import { verify } from "hono/jwt";

export const VerifyAuth = async (ctx: ResponseContext, next: Next) => {
    const { PRIVATE_KEY } = process.env;
    const authToken = ctx.req.header('Authorization')?.split(' ')[0];

    if (!authToken) {
        return ctx.unauthorized();
    }

    const verifyToken = await verify(authToken, PRIVATE_KEY as string);
    if (!verifyToken) {
        return ctx.unauthorized();
    }
    
    return next();
}