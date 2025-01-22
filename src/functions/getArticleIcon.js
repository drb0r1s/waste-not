import { articleImages } from "../data/articleImages";
import { toCamelCase } from "./toCamelCase";

export function getArticleIcon(name) {
    let icon = "";
            
    Object.keys(articleImages).forEach((imageKey, index) => {
        if(imageKey === toCamelCase(name)) icon = Object.values(articleImages)[index];
    });

    return icon;
}