import { Context, Hono, Next } from 'hono';
import { cors } from 'hono/cors';
import Manifest from "@routes/index";
import RequestLogger from './middleware/HttpLogger';
import { ResponseMiddleware } from '@middleware/Response';
import { ResponseContext } from '@interface/ResponseContext';

type AppConfig = {
    Bindings: {},
    Variables: {},
    CustomContext: ResponseContext;
}

const app = new Hono<AppConfig>();

app.use(cors({ origin: '*', credentials: true }));
app.use(RequestLogger)
app.use(ResponseMiddleware as unknown as (ctx: Context, next: Next) => Promise<void>);

app.route('/api', Manifest)


export default {
    port: 3500,
    fetch: app.fetch
};
