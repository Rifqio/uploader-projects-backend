import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { dirname, join } from 'path';

const protoFile = join(dirname(__dirname), 'proto', 'upload.proto');
const packageDefinition = loadSync(protoFile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const uploadProto = protoDescriptor.upload as any;

const UploadService = uploadProto.UploadService as unknown as grpc.ServiceClientConstructor;

const client = new UploadService('localhost:5050', grpc.credentials.createInsecure());

export default client;
