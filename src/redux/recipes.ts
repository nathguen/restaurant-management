import { Dispatch } from "redux";
import { Recipe } from "../types";
import { fetchRecipes as fetchRecipesFromAPI } from "../api/recipes";

export const SET_RECIPES = 'SET_RECIPES';

interface SetRecipesAction {
    type: string
    recipes: Recipe[]
}

export interface RecipesActions extends
    SetRecipesAction {
}

export function setRecipes(recipes: Recipe[]): SetRecipesAction {
    return {
        type: SET_RECIPES,
        recipes
    };
}


export function fetchRecipes() {
    return async (dispatch: Dispatch) => {
        const resp = await fetchRecipesFromAPI();

        if (resp.ok) {
            dispatch(setRecipes(resp.data))
        }

        return resp;
    };
}