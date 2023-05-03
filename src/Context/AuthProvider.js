import { createContext, useState, useContext } from "react";
import { apiClient } from "../Components/api/ApiClient";
import { executeJwtAuthenticationService } from "../Components/api/AuthenticationApiService";
//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


//2: Share the created context with other components
export default function AuthProvider ({ children }) {
   //3: Put some state in the context

   const [isAuthenticated, setAuthenticated] = useState(false)
 
    const [email, setEmail] = useState(null)

    const [token, setToken] = useState(null)

    async function login(email, password) {

        try {

            const response = await executeJwtAuthenticationService(email, password)

            if(response.status==200){
                
                const jwtToken = 'Bearer ' + response.data.token
                
                setAuthenticated(true)
                
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setEmail(null)
        console.log(token)
    }
  
    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, email, token}  }>
            {children}
        </AuthContext.Provider>
    )

}
