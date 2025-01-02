export function toCamelCase(string) {
    const words = string.toLowerCase().split(" ");
    let camelCase = words[0];

    for(let i = 1; i < words.length; i++) {
        const firstLetter = words[i][0].toUpperCase();
        const letters = words[i].substring(1);

        camelCase += firstLetter + letters;
    }

    return camelCase;
}