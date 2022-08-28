import axios from 'axios';
import Idx from 'idx';

const AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 1000 * 60 * 2
});


AxiosInstance.interceptors.request.use(
    (config:any) => config,
    (error:any) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
    (response:any) => response,
    (error:any) => {
        if(Idx(error, (_) => _.response.data)){
            const errorDetail = {
                code: error.response.status,
                message: error.response.data.message,
            };

            return Promise.reject(errorDetail);
        }

        return Promise.reject(error);
    },
);

export default AxiosInstance;