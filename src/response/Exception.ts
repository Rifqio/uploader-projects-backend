import { HTTPException } from 'hono/http-exception';

const Unauthorized = new Response('Unauthorized', {
    status: 401,
    statusText: 'Unauthorized'
});