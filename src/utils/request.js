import axios from "taro-axios";
const baseURL = `http://localhost:8080`

const service = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 300000
});
service.interceptors.response.use(
    response => {
        if( response.status ){
            return response.data;
        }

    },
    error => {
        return Promise.reject(error)
    })

export default service
