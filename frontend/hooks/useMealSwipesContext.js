import { MealSwipesContext } from '../context/MealSwipeContext'
import { useContext } from 'react'

export const useMealSwipesContext = () => {
        const context = useContext(MealSwipesContext)

        if (!context) {
                throw Error("useMealSwipesContext must be used inside an MealSwipesCOntextProvider")
        }
        return context
}