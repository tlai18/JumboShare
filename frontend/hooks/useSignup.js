import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useSignup = () => {
        const [error, setError]  = useState(null)
        const [isLoading, setIsLoading] = useState(null)
        const { dispatch } = useAuthContext()

        const signup = async (email, password) => {
                setIsLoading(true)
                setError(null)
                const response = await fetch('http://192.168.1.151:4000/api/user/signup', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({email, password})
                })

                // const json = await response.json()
                console.log(response.status); // Log the status code
                const json = await response.json();
                console.log(json); // Log the response body
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

        return { signup, isLoading, error}

}