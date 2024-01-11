export interface IEnabledRequest {
    id: string,
    enabled: boolean
}

export const INITIAL_ENABLED: IEnabledRequest = {
    id: "",
    enabled: false
}