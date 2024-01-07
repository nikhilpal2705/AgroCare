import axios from 'axios';
import errorHandler from "api/errorHandler";
import successHandler from "api/successHandler";
import * as constant from "helper/constant";
import { AUTH_BASE_URL, HOME_BASE_URL } from 'api/config';

export const login = async ({ loginData }) => {
    try {
        const response = await axios.post(
            AUTH_BASE_URL + "login", loginData);
        let responseData = response.data
        const data = {
            jwtToken: responseData.jwtToken,
            isAdmin: false,
            name: responseData.user.name,
            email: responseData.user.email,
            userId: responseData.user.id,
            authority: responseData.user.authorities[0]?.authority
        }
        return data
    } catch (error) {
        return errorHandler(error);
    }
};

export const register = async ({ registerData }) => {
    try {
        registerData.authorities = constant.Authorities.USER;
        registerData.status = constant.Status.ACTIVE;
        const response = await axios.post(
            HOME_BASE_URL + "register", registerData);
        successHandler(response, {
            notifyOnSuccess: true,
            notifyOnFailed: true,
        })
        return { success: true }
    } catch (error) {
        return errorHandler(error);
    }
};

export const logout = async () => {

};
