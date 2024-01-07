import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL, ACCESS_TOKEN_NAME, USER_BASE_URL } from './config';
import errorHandler from './errorHandler';
import successHandler from './successHandler';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = ACCESS_TOKEN_NAME + Cookies.get('jwtToken');
const ACCESS_URL = USER_BASE_URL

const api = {
    create: async ({ entity, jsonData }) => {
        try {
            const response = await axios.post(ACCESS_URL + entity, jsonData);
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    read: async ({ entity, id }) => {
        try {
            const response = await axios.get(ACCESS_URL + `${entity}/${id}`);
            successHandler(response, {
                notifyOnSuccess: false,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    update: async ({ entity, id, jsonData }) => {
        try {
            const response = await axios.patch(ACCESS_URL + `${entity}/${id}`, jsonData);
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    delete: async ({ entity, id }) => {
        try {
            const response = await axios.delete(ACCESS_URL + `${entity}/${id}`);
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    list: async ({ entity, options = {} }) => {
        try {
            const response = await axios.get(ACCESS_URL + entity);

            successHandler(response, {
                notifyOnSuccess: false,
                notifyOnFailed: false,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    listAll: async ({ entity }) => {
        try {
            const response = await axios.get(ACCESS_URL + entity);
            console.log(`😱 😓 😒 ~ file: api.js:76 ~ listAll: ~ response:`, response)

            successHandler(response, {
                notifyOnSuccess: false,
                notifyOnFailed: false,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    post: async ({ entity, jsonData }) => {
        try {
            const response = await axios.post(entity, jsonData);
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    get: async ({ entity }) => {
        try {
            const response = await axios.get(entity);
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    put: async ({ entity, jsonData }) => {
        try {
            const response = await axios.put(entity, jsonData);
            successHandler(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
};
export default api;
