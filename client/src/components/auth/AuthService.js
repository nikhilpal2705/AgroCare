import errorHandler from "api/errorHandler";
import successHandler from "api/successHandler";
import * as constant from "helper/constant";
import api from "api/api";
// import { toast } from 'react-toastify';


export const login = async ({ loginData }) => {
    try {
        const response = await api.post("/auth/login", loginData);
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
        // toast.error(error.response.data);  
        return errorHandler(error);
    }
};

export const register = async ({ registerData }) => {
    try {
        registerData.authorities = constant.Authorities.USER;
        registerData.status = constant.Status.ACTIVE;
        const response = await api.post("/register", registerData);
        successHandler(response, {
            notifyOnSuccess: true,
            notifyOnFailed: true,
        })
        return { success: true }
        // toast.success(response.data);
    } catch (error) {
        return errorHandler(error);
        // toast.error(error.response.data);
    }
};

export const logout = async () => {

};
