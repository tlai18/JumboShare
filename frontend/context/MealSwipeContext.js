import { createContext, useReducer } from 'react'

export const MealSwipesContext = createContext()

export const MealSwipesReducer = (state, action) => {
        switch (action.type) {
                
                case 'SET_MEALSWIPES':
                        return {
                                mealswipes: action.payload
                        }
                case 'CREATE_MEALSWIPE':
                        return {
                                mealswipes: [action.payload, ...state.mealswipes]
                        }
                case 'DELETE_MEALSWIPE':
                        return {
                                mealswipes: state.mealswipes.filter((w) => w._id !== action.payload._id) 
                        }
                case 'UPDATE_MEALSWIPE':
                        return {
                                mealswipes: state.mealswipes.map((w) =>
                                w._id === action.payload._id ? action.payload : w
                                )
                        }
                default:
                        return state
        }

}

export const MealSwipesContextProvider = ({ children })=> {
        const [state, dispatch] = useReducer(MealSwipesReducer, {
                mealswipes: []
                // mealswipes: null 
        })

        return (
                <MealSwipesContext.Provider value={{...state, dispatch}}>
                         { children }
                </MealSwipesContext.Provider>
        )
}
