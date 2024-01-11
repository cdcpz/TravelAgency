export interface ITraveler {
    id: string,
    enabled: true,
    person: {
      id: string,
      enabled: true,
      contact: {
        indicative: number,
        value: string,
        name: string
      },
      lastName: string,
      birth: Date,
      gender: number,
      document: {
        type: number,
        value: string
      },
      email: string
    },
    credential: {
      id: string,
      enabled: true,
      user: string,
      rol: number,
      password: string,
      contact: {
        indicative: number,
        value: string,
        name: string
      }
    },
    bookings: Array<any>
}

export interface IContact {
    indicative: number,
    value: string,
    name: string
}

export interface IPerson {
    id: string,
    enabled: true,
    contact: IContact,
    lastName: string,
    birth: Date,
    gender: number,
    document: {
      type: number,
      value: string
    },
    email: string
}

export interface IHotel {
    id: string,
    enabled: true,
    name: string,
    description: string,
    imageUrl: string,
    minPrice: number
}


export interface IRoom {
    id: string,
    enabled: boolean,
    hotel: IHotel,
    location: string,
    type: number,
    cost: number,
    tax: number,
    profit: number,
    capacity: number,
    city: string,
    imageUrl: string,
    price: number,
    bookings: Array<any>
}

export interface IBookingReponse {
  id: string,
  enabled: boolean,
  roomId: string,
  room: IRoom,
  traveler: ITraveler,
  guests: Array<IPerson>,
  emergencyContact: IContact,
  start: Date,
  end: Date,
  price: number,
  quantityPeople: number
}

export interface IEmergencyContact {
  indicative: number,
  phone: string,
  name: string
}

export interface IGuestRequest {
  name: string,
  indicative: number,
  phone: string,
  documentType: number,
  document: string,
  lastName: string,
  birth: Date,
  gender: number,
  email: string
}

export interface IBookingRequest {
  roomId: string,
  credentialId: string,
  guests: IGuestRequest[],
  emergencyContact: IEmergencyContact,
  start: Date,
  end: Date,
  city: string
}
