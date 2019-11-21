import { Item } from "./item";

export interface Recipe {
    id: number
    name: string
    items: Item[]
}