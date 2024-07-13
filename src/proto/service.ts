import { Logger } from "../utils/logger";
import * as grpc from '@grpc/grpc-js';
import { UploadServiceGRPC } from "../@types/UploadTypes";

const Namespace = 'UploadService';

export const UploadService : UploadServiceGRPC & grpc.UntypedServiceImplementation = {
    upload: (call, callback) => {
        Logger.info(`[GRPC-Server::${Namespace}] File uploaded: ${call.request.name}`);
        callback(null, { message: `File uploaded: ${call.request.name}` });
    }
};