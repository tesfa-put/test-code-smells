
import { api } from "../plugins"
import {SendNotification} from "../plugins"


export const loginApi = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/login/', {username: username, password: password})
        return response
    } catch (e: any) {
        return e!.response
    }
}


export const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = tokenString;
    return userToken
}

export const profikeApi = async () => {
    try {

        const response = await api.get('/auth/login/')
        return response
    } catch (e: any) {
        return e!.response
    }
}
