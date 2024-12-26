export const Storage = {
    initialization: () => {
        const items = ["HOUSEHOLDS", "ARTICLES"];
        
        for(let i = 0; i < items.length; i++) {
            if(localStorage.getItem(items[i])) continue;

            localStorage.setItem(items[i], JSON.stringify([]));
            localStorage.setItem(`${items[i]}_NEXT_ID`, 0);
        }
    },
    
    add: (key, value) => {
        const values = JSON.parse(localStorage.getItem(key));
        const keyNextId = parseInt(localStorage.getItem(`${key}_NEXT_ID`));

        localStorage.setItem(key, JSON.stringify([...values, {...value, id: keyNextId}]));
        localStorage.setItem(`${key}_NEXT_ID`, keyNextId + 1);
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
    },

    remove: (key, id, cascade) => {
        removeItem(key, "id", id);
        if(cascade) removeItem(cascade, `${key.substring(0, key.length - 1).toLowerCase()}Id`, id);

        function removeItem(key, property, value) {
            const item = JSON.parse(localStorage.getItem(key));
            if(!item) return;

            const newItem = [];
    
            for(let i = 0; i < item.length; i++) {
                if(item[i][property] !== value) newItem.push(item[i]);
            }
    
            localStorage.setItem(key, JSON.stringify(newItem));
        }
    }
}