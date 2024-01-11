import { SignupService } from "../../../../shared/components/signup-modal/service/signup.service"
import { ISelectOption } from "../../../../shared/models/response"
import { ISignup, ISignupRequestModal } from "../../../../shared/models/signup-modal"

const GetModalParamsGuest = (guest?:ISignup): ISignupRequestModal => {
    let _guest: ISignup = guest ?? {
        name: '',
        lastName: '',
        documentType: -1,
        document: '',
        gender: -1,
        birth: '',
        phone: '',
        indicative: null,
        email: '',
        password: ''
    }
    return {
        title: 'Registrar acompañante',
        showPassword: false,
        mode: guest ? "EDIT" : "ADD",
        content: _guest
    }
}

export const Utils = {
    GetModalParamsGuest: GetModalParamsGuest
}