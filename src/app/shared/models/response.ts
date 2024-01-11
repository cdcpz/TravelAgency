export interface IApiResponse<T> {
    status:number,
    message: string,
    data: T

}
export interface ISelectOption {
    id: number,
    name: string
}