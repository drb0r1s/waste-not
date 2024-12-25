export const Storage = {
    add: (key, value) => {
        if(!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([{...value, id: 0}]));
            localStorage.setItem(`${key}_NEXT_ID`, 1);
        }

        else {
            const values = JSON.parse(localStorage.getItem(key));
            const keyNextId = parseInt(localStorage.getItem(`${key}_NEXT_ID`));

            localStorage.setItem(key, JSON.stringify([...values, {...value, id: keyNextId}]));
            localStorage.setItem(`${key}_NEXT_ID`, keyNextId + 1);
        }
    },

    get: (key, foreign) => {
        if(!localStorage.getItem(key)) return [];

        let values = JSON.parse(localStorage.getItem(key));
        if(foreign == null) return values;

        if(foreign.key !== null) {
            const filteredValues = [];

            for(let i = 0; i < values.length; i++) {
                if(values[i][foreign.key] === foreign.value) filteredValues.push(values[i]);
            }

            values = filteredValues;
        }

        return values;
    }
}