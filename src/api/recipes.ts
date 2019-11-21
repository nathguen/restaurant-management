import { Recipe } from "../types";
import { GenericHttpResponse } from ".";

interface FetchRecipesResponse extends GenericHttpResponse {
    data: Recipe[];
}

export async function fetchRecipes(): Promise<FetchRecipesResponse> {
    const resp = await fetch('https://demo5544737.mockable.io/recipes', {
        headers: {
            accept: 'application/json'
        }
    });

    let recipes: Recipe[] = [];

    if (resp.ok) {
        const data = await resp.json();
        recipes = data.recipes;
    }
    
    return {
        ok: resp.ok,
        status: resp.status,
        statusText: resp.statusText,
        data: recipes
    };
}