export interface ISignup {
    name: string,
    lastName: string,
    documentType: number,
    document: string,
    gender: number,
    birth: string
    phone: string,
    indicative: number|null,
    email: string,
    password: string
}

export const INIT_SIGNUP : ISignup = {
    name: "",
    lastName: "",
    documentType: -1,
    document: "",
    gender: -1,
    birth: "",
    phone: "",
    indicative: null,
    email: "",
    password: ""
}

export interface ISignupRequestModal {
    title: string,
    mode: 'ADD'|'EDIT'|'CONFIRMATION'
    showPassword: boolean,
    content: ISignup
}

export interface IResponseModal<T> {
    mode: 'ADD'|'EDIT'|'CONFIRMATION',
    dispatcher: 'OK'|'CLOSE'|'CANCEL',
    content: T
}

