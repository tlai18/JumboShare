import { useAuthContext } from "./useAuthContext";
import { useMealSwipesContext } from "./useMealSwipesContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useLogout = () => {
        const { dispatch } = useAuthContext()
        const { dispatch: mealswipesDispatch }  = useMealSwipesContext()
        const logout = async () => {
                // Remove user from AsyncStorage
                await AsyncStorage.removeItem('user');
                
                // dispatch logout action
                dispatch({type: 'LOGOUT'})
                mealswipesDispatch({type: 'SET_MEALSWIPES', payload: null})
        }

        return { logout }
}