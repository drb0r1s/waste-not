import { v4 as uuidv4 } from "uuid";
import { gun } from "../data/gunInitialization";
import { users } from "../data/users";

export const Storage = {
    initialization: () => {
        const profile = Storage.get("PROFILE");
        if(typeof profile.id === "number") Storage.clear();

        Storage.profileInitialization();
        
        const items = ["HOUSEHOLDS", "ARTICLES", "LIST_ARTICLES", "NOTIFICATIONS", "USERS"];
        
        for(let i = 0; i < items.length; i++) {
            if(localStorage.getItem(`WASTENOT_${items[i]}`)) continue;

            localStorage.setItem(`WASTENOT_${items[i]}`, JSON.stringify([]));
            
            if(items[i] !== "USERS") localStorage.setItem(`WASTENOT_${items[i]}_NEXT_ID`, 0);
            else Storage.loadUsers();
        }

        Storage.gunInitialization();
    },

    profileInitialization: () => {
        if(localStorage.getItem("WASTENOT_PROFILE")) return;
        
        const profile = {
            id: uuidv4(),
            name: "You",
            nickname: "",
            icon: "",
            banner: ""
        };

        localStorage.setItem("WASTENOT_PROFILE", JSON.stringify(profile));
    },
    
    add: (key, value) => {
        const values = JSON.parse(localStorage.getItem(`WASTENOT_${key}`));
        const keyNextId = parseInt(localStorage.getItem(`WASTENOT_${key}_NEXT_ID`));
        
        localStorage.setItem(`WASTENOT_${key}`, JSON.stringify([...values, {id: keyNextId, ...value}]));
        localStorage.setItem(`WASTENOT_${key}_NEXT_ID`, keyNextId + 1);
    },

    get: (key, filter) => {
        if(!localStorage.getItem(`WASTENOT_${key}`)) return [];

        let values = JSON.parse(localStorage.getItem(`WASTENOT_${key}`));
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

    remove: (key, id, cascade = []) => {
        removeItem(key, "id", id);
        
        if(cascade.length) {
            for(let i = 0; i < cascade.length; i++) removeItem(cascade[i], `${key.substring(0, key.length - 1).toLowerCase()}Id`, id);
        }

        function removeItem(key, property, value) {
            const item = JSON.parse(localStorage.getItem(`WASTENOT_${key}`));
            if(!item) return;

            const newItem = [];
    
            for(let i = 0; i < item.length; i++) {
                if(item[i][property] !== value) newItem.push(item[i]);
            }
    
            localStorage.setItem(`WASTENOT_${key}`, JSON.stringify(newItem));
        }
    },

    update: (key, id, updatedProps) => {
        const item = JSON.parse(localStorage.getItem(`WASTENOT_${key}`));
        const newItem = [];

        for(let i = 0; i < item.length; i++) {
            if(item[i].id === id) {
                newItem.push({...item[i], ...updatedProps});
                continue;
            }

            newItem.push(item[i]);
        }

        localStorage.setItem(`WASTENOT_${key}`, JSON.stringify(newItem));
    },

    updateProfile: updatedProps => {
        const profile = JSON.parse(localStorage.getItem("WASTENOT_PROFILE"));
        localStorage.setItem("WASTENOT_PROFILE", JSON.stringify({...profile, ...updatedProps}));
    },

    selectRandom: (key, bounds) => {
        const item = JSON.parse(localStorage.getItem(`WASTENOT_${key}`));
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
        const profile = JSON.parse(localStorage.getItem("WASTENOT_PROFILE"));
        const formatedUsers = [];

        for(let i = 0; i < users.length; i++) {            
            formatedUsers.push({ id: users[i].id, name: users[i].name, nickname: "" });
        }

        localStorage.setItem("WASTENOT_USERS", JSON.stringify([profile, ...formatedUsers]));
    },

    gunInitialization: () => {
        const gunItems = ["HOUSEHOLDS", "ARTICLES", "LIST_ARTICLES", "NOTIFICATIONS", "USERS"];
        
        for(let i = 0; i < gunItems.length; i++) {
            const gunItem = gun.get(gunItems[i]);   
            gunItem.map().on((data, key) => Storage.updateFromGun(gunItems[i], key, data));
        }
    },

    gunAdd: (key, value) => {
        const gunItem = gun.get(key);
        gunItem.set(JSON.stringify(value));
    },

    gunAddUser: user => {
        const gunUsers = gun.get("USERS");

        let gunUser;
        gunUsers.get(user.id).once(data => { gunUser = data });

        if(gunUser !== undefined) return;
        gunUsers.set(JSON.stringify(user));
    },

    gunUpdate: (key, valueId, value) => {
        const gunItem = gun.get(key);
        
        let gunValue;
        gunItem.get(valueId).once(data => { gunValue = JSON.parse(data) });
        
        gunItem.get(valueId).put(JSON.stringify({...gunValue, ...value}));
    },

    gunRemove: (key, valueId) => {
        const gunItem = gun.get(key);
        gunItem.get(valueId).put(null);
    },

    gunListen: (key, callback) => {
        const gunItem = gun.get(key);
        gunItem.map().on(callback);
    },

    gunKill: key => {
        const gunItem = gun.get(key);
        gunItem.map().off();
    },

    addFromGun: (key, valueId, value) => {
        const values = JSON.parse(localStorage.getItem(`WASTENOT_${key}`));
        localStorage.setItem(`WASTENOT_${key}`, JSON.stringify([...values, {...value, id: valueId}]));
    },

    updateFromGun: (key, valueId, value) => {
        if(value === null) return Storage.remove(key, valueId);

        const item = Storage.get(key);
        const parsedValue = JSON.parse(value);

        const id = key === "USERS" ? parsedValue.id : valueId;
        let exists = false;

        for(let i = 0; i < item.length; i++) if(item[i].id === id) {
            exists = true;
            break;
        }

        let updatedValue = parsedValue;

        if(key === "USERS") {
            const [user] = Storage.get("USERS", { key: "id", value: parsedValue.id });

            if(parsedValue?.update) updatedValue = {...user, [parsedValue.update]: parsedValue[parsedValue.update]};
            else updatedValue = user;
        }

        if(exists) return Storage.update(key, id, updatedValue);
        Storage.addFromGun(key, id, parsedValue);
    },

    clear: () => {
        const gunItems = ["HOUSEHOLDS", "ARTICLES", "LIST_ARTICLES", "NOTIFICATIONS", "USERS"];
        
        for(let i = 0; i < gunItems.length; i++) {
            const gunItem = gun.get(gunItems[i]);   
            
            gunItem.map().once((data, key) => {
                if (key) gunItem.get(key).put(null);
            });

            localStorage.clear();
        }
    }
}