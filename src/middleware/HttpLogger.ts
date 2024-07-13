import { Logger } from '@utils/logger';
import { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';

const RequestLogger = createMiddleware(async (ctx: Context, next: Next) => {
    const { method, url } = ctx.req;

    let requestLog;
    if (method !== 'POST') {
        requestLog = `${method} ${url}`;
    } else {
        requestLog = `${method} ${url} | payload: ${JSON.stringify(await ctx.req.json())}`;
    }

    Logger.http(requestLog);
    return next();
});

export default RequestLogger;
