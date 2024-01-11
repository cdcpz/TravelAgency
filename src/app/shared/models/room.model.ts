export interface IManageRoomRequest {
    id: string,
    hotelId: string,
    location: string,
    type: string,
    cost: number,
    tax: number,
    profit: number,
    capacity: number,
    city: string,
    imageUrl: string
}
export const INITIAL_ROOM : IManageRoomRequest = {
    id: "",
    hotelId: "",
    location: "",
    type: "",
    cost: 0,
    tax: 0,
    profit: 0,
    capacity: 0,
    city: "",
    imageUrl: ""
}

export interface IFilterFreeRoomRequest {
    city: string,
    quantityPeople: number,
    start: Date,
    end: Date
}

export interface IFilterRoomRequest {
    id: string
}