import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { Logger } from '../utils/logger';
import { UploadServiceGRPC } from '../@types/UploadTypes';
import { UploadService } from './service';
import { dirname, join } from 'path';

const Namespace = 'UploadService';
const protoFile = join(dirname(__dirname), 'proto', 'upload.proto');
const packageDefinition = loadSync(protoFile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const uploadProto = grpc.loadPackageDefinition(packageDefinition).upload as {
    UploadService: grpc.ServiceClientConstructor & {
        service: grpc.ServiceDefinition<UploadServiceGRPC>;
    };
};

const server = new grpc.Server();

server.addService(uploadProto.UploadService.service, UploadService);

server.bindAsync('127.0.0.1:5050', grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
        if (err) {
            Logger.error(
                `[GRPC-Server::${Namespace}] Failed to bind server: ${err.message}`
            );
            return;
        }
        Logger.info(
            `[GRPC-Server::${Namespace}] Server is running on port: ${port}`
        );
    }
);
