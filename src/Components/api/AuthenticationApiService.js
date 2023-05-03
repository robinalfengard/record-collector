import { apiClient } from "./ApiClient";



export const executeJwtAuthenticationService
    = (email, password) => 
        apiClient.post(`/api/auth/login`,{email, password})
