export type UserRegisterDTO = {
    email: string;
    username: string;
    password: string;
    name: string;
}

export type UserLoginDTO = {
    username: string;
    password: string;
}

export type UserDTO = {
    id: string;
    email: string;
    username: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}