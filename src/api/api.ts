import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '4deb8f14-6cf3-406a-968c-ffbe6aebefc3'
    }
})