export function cutText(text, length) {
    let newText = text;
    if(text.length > length) newText = `${text.substring(0, length)}...`;

    return newText;
}