import { writable } from 'svelte/store';
import {ethers } from "ethers"


export interface iTodo {
    id: number;
    title: string;
    done: boolean;
}

const initialTodos: iTodo[] = [
    { id: 1, title: 'Learn Svelte', done: false },
    { id: 2, title: 'Learn TypeScript', done: false },
]

export const todos = writable(initialTodos);

export interface iSoji {
    name: string;
    description: string;
    image: string;
    animation_url: string;
    tags: string[];
}

const initialSojis: iSoji[] = [
    {
        name: "Dar-ling",
        description: "zerotwo saying darling",
        image: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F926655043065741362.gif%3Fv%3D1&w=64&q=75",
        animation_url: "https://www.myinstants.com/media/sounds/dar-ling.mp3",
        tags: ["zerotwo", "darling"]
    }
]

export const sojis = writable(initialSojis);
