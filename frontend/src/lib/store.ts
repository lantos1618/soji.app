import { writable } from 'svelte/store';

export interface SojiType {
    name: string;
    description: string;
    image: string;
    animation_url: string;
    tags: string[];
}

let initialSojis: SojiType[] = [
    {
        name: "Dar-ling",
        description: "zerotwo saying darling",
        image: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F926655043065741362.gif%3Fv%3D1&w=64&q=75",
        animation_url: "https://www.myinstants.com/media/sounds/dar-ling.mp3",
        tags: ["zerotwo", "darling"]
    }
]
for (let i = 0; i < 10; i++) {
    initialSojis.push({
        name: "Soji " + i,
        description: "Soji " + i,
        image: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F926655043065741362.gif%3Fv%3D1&w=64&q=75",
        animation_url: "https://www.myinstants.com/media/sounds/dar-ling.mp3",
        tags: ["soji", "soji " + i]
    })
}

export let sojis = writable(initialSojis);
export let sojisSearchResult = writable(initialSojis, (set) => {});
