import { Context } from 'hono';

export interface ResponseContext extends Context {
    success: (message?: string, data?: any) => void;
    badRequest: (message?: string) => void;
    unauthorized: () => void;
    internalServerError: (message?: string) => void;
}
