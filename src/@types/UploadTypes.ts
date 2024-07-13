import * as grpc from '@grpc/grpc-js';

export interface UploadRequestGRPC {
    name: string;
}

export interface UploadResponseGRPC {
    message: string;
}

export interface UploadServiceGRPC {
    upload: (call: grpc.ServerUnaryCall<UploadRequestGRPC, UploadResponseGRPC>, callback: grpc.sendUnaryData<UploadResponseGRPC>) => void;
}
