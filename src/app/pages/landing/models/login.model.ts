export interface ILoginRequest {
    user: string,
    password: string
}

export interface ILoginResponse {
    id: string,
    name: string,
    rol: {
        id: number,
        name: string
    },
    token: string
}