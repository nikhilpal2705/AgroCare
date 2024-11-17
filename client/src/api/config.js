export const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_SERVER_BASE_URL : window.location.origin
export const API_BASE_URL = process.env.NODE_ENV === 'development' ? BASE_URL : BASE_URL + "/api"
export const HOME_BASE_URL = API_BASE_URL + "/"
export const AUTH_BASE_URL = API_BASE_URL + "/auth/"
export const ADMIN_BASE_URL = API_BASE_URL + "/admin/"
export const USER_BASE_URL = API_BASE_URL + "/user/"
export const COMMON_BASE_URL = API_BASE_URL + "/common/"
export const ACCESS_TOKEN_NAME = "Bearer ";
