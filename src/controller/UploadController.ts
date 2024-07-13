import { Context } from 'hono';
import { Logger } from '@utils/logger';

const Namespace = 'UploadController';
const GetUploadedFile = async (ctx: Context) => {
    return ctx.json({ message: 'Upload' });
};

const UploadFile = async (ctx: Context) => {
    try {
        // await GrpcClient.Upload();
    } catch (error: any) {
        Logger.error(`[Controller::${Namespace}] Error: ${error.message}`);
    }
}

export default {
    GetUploadedFile,
    UploadFile
};
