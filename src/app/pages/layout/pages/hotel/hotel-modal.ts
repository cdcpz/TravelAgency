export interface IHotel {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    minPrice: number,
    enabled: boolean,
    rooms:[]
}

export const INIT_HOTEL : IHotel = {
    id: "",
    name: "",
    description: "",
    imageUrl: "",
    minPrice: 0,
    enabled: false,
    rooms: []
}