import { users } from "../data/users";

export const Storage = {
    initialization: () => {
        Storage.initializeProfile();
        
        const items = ["HOUSEHOLDS", "ARTICLES", "LIST_ARTICLES", "USERS"];
        
        for(let i = 0; i < items.length; i++) {
            if(localStorage.getItem(items[i])) continue;

            localStorage.setItem(items[i], JSON.stringify([]));
            
            if(items[i] !== "USERS") localStorage.setItem(`${items[i]}_NEXT_ID`, 0);
            else Storage.loadUsers();
        }
    },

    initializeProfile: () => {
        if(localStorage.getItem("PROFILE")) return;
        
        const profile = {
            id: 1,
            name: "You",
            nickname: "",
            icon: ""
        };

        localStorage.setItem("PROFILE", JSON.stringify(profile));
    },
    
    add: (key, value) => {
        const values = JSON.parse(localStorage.getItem(key));
        const keyNextId = parseInt(localStorage.getItem(`${key}_NEXT_ID`));

        localStorage.setItem(key, JSON.stringify([...values, {id: keyNextId, ...value}]));
        localStorage.setItem(`${key}_NEXT_ID`, keyNextId + 1);
    },

    get: (key, filter) => {
        if(!localStorage.getItem(key)) return [];

        let values = JSON.parse(localStorage.getItem(key));
        if(filter == null) return values;

        if(filter.key !== null) {
            const filteredValues = [];

            for(let i = 0; i < values.length; i++) {
                if(values[i][filter.key] === filter.value) filteredValues.push(values[i]);
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
    },

    update: (key, id, updatedProps) => {
        const item = JSON.parse(localStorage.getItem(key));
        const newItem = [];

        for(let i = 0; i < item.length; i++) {
            if(item[i].id === id) {
                newItem.push({...item[i], ...updatedProps});
                continue;
            }

            newItem.push(item[i]);
        }

        localStorage.setItem(key, JSON.stringify(newItem));
    },

    selectRandom: (key, bounds) => {
        const item = JSON.parse(localStorage.getItem(key));
        if(key === "USERS") item.shift();

        const selected = [];

        const [min, max] = bounds;
        const amount = Math.floor(Math.random() * (max - min + 1)) + min;

        for(let i = 0; i < amount; i++) selected.push(select());

        function select() {
            const selection = item[Math.floor(Math.random() * item.length)];
            let exists = false;

            for(let i = 0; i < selected.length; i++) {
                if(selected[i].name === selection.name) exists = true;
            }

            if(exists) return select();
            return selection;
        }

        return selected;
    },

    loadUsers: () => {
        const profile = JSON.parse(localStorage.getItem("PROFILE"));
        localStorage.setItem("USERS", JSON.stringify([profile, ...users]));
    }
}