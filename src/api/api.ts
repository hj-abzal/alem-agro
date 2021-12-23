import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

//API
export const UserAPI = {
  getAllUsers() {
    return instance.get<UsersResponseType[]>('users');
  },
  addUser(payload: Omit<UsersResponseType, 'id'>) {
    return instance.post<UsersResponseType>('users', payload);
  },
  updateUser(payload: UsersResponseType) {
    const id = payload.id;
    return instance.put<UsersResponseType>(`users/${id}`, payload);
  },
};




//TYPES
export type UsersResponseType = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode?: number,
    geo?: {
      lat: number,
      lng: number
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs?: string
  }
};
