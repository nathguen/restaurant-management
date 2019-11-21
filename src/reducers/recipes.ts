import { RootState } from ".";
import { SET_RECIPES, RecipesActions } from "../redux/recipes";
import { Recipe } from "../types";

export type RecipesState = {
    [key: number]: Recipe
};

export const defaultRecipesState: RecipesState = {};

// fix action type
function recipesReducer(state = defaultRecipesState, action: RecipesActions): RecipesState {
    switch (action.type) {
        case SET_RECIPES:
            return action.recipes.reduce((map, item) => {
                map[item.id] = item;
                return map;
            }, {} as RecipesState);

        default:
            return state;
    }
}

export default recipesReducer;


export function getRecipesState(state: RootState): RecipesState {
    return state.recipes;
}

export function getRecipeById(id: number, state: RootState): Recipe {
    return getRecipesState(state)[id];
}