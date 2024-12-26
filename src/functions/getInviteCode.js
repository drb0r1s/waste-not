export function getInviteCode() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";

    const combination = [alphabet, digits];
    
    let code = "";

    for(let i = 0; i < 16; i++) {
        const randomArray = Math.floor(Math.random() * combination.length);
        let randomCase = false;

        let symbol = combination[randomArray][Math.floor(Math.random() * combination[randomArray].length)]; 

        if(!randomArray) {
            randomCase = Math.floor(Math.random() * 2);

            if(!randomCase) symbol = symbol.toLowerCase();
            else symbol = symbol.toUpperCase();
        }

        code += symbol;
    }

    return code;
}