import errorHandler from "../../helper/errorHandler";
import successHandler from "../../helper/successHandler";
import * as constant from "../../helper/constant";
import api from "../../utils/api";
// import { toast } from 'react-toastify';


export const login = async ({ loginData }) => {
    try {
        const response = await api.post("/auth/login", loginData);

        const data = {
            ...response.data,
            isAdmin: false
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
        const response = await api.post("/registerUser", registerData);
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
