import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const useLogin = () => {
        const [error, setError]  = useState(null)
        const [isLoading, setIsLoading] = useState(null)
        const { dispatch } = useAuthContext()

        const login = async (email, password) => {
                setIsLoading(true)
                setError(null)

                const response = await fetch('http://192.168.1.151:4000/api/user/login', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({email, password})
                })

                const json = await response.json()
                if (!response.ok) {
                        setIsLoading(false)
                        setError(json.error)
                }
                if (response.ok) {
                        setIsLoading(false)

                        // Save the user to AsyncStorage
                        await AsyncStorage.setItem('user', JSON.stringify(json));

                        // update auth context
                        dispatch({type: 'LOGIN', payload: json})
                }
        }

        return { login, isLoading, error}

}