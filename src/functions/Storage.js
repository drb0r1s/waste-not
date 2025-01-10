import { users } from "../data/users";
import { avatars } from "../data/avatars";
import { banners } from "../data/banners";

export const Storage = {
    initialization: () => {
        Storage.initializeProfile();
        
        const items = ["HOUSEHOLDS", "ARTICLES", "LIST_ARTICLES", "NOTIFICATIONS", "USERS"];
        
        for(let i = 0; i < items.length; i++) {
            if(localStorage.getItem(`WASTENOT_${items[i]}`)) continue;

            localStorage.setItem(`WASTENOT_${items[i]}`, JSON.stringify([]));
            
            if(items[i] !== "USERS") localStorage.setItem(`WASTENOT_${items[i]}_NEXT_ID`, 0);
            else Storage.loadUsers();
        }
    },

    initializeProfile: () => {
        if(localStorage.getItem("WASTENOT_PROFILE")) return;
        
        const profile = {
            id: 1,
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

    remove: (key, id, cascade) => {
        removeItem(key, "id", id);
        if(cascade) removeItem(cascade, `${key.substring(0, key.length - 1).toLowerCase()}Id`, id);

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

        const usedAvatars = { m: [], f: [] };
        const usedBanners = [];

        for(let i = 0; i < users.length; i++) {
            const icon = getAvatar(users[i]);
            const banner = getBanner();
            
            formatedUsers.push({ id: users[i].id, name: users[i].name, nickname: "", icon, banner });
        }

        localStorage.setItem("WASTENOT_USERS", JSON.stringify([profile, ...formatedUsers]));

        function getAvatar(user) {
            const avatarProbability = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            if(avatarProbability === 3) return "";

            if(user.gender === "m" && usedAvatars.m.length === 22) return "";
            if(user.gender === "f" && usedAvatars.f.length === 15) return "";
            
            const avatarNumber = getRandomImageNumber(user.gender === "m" ? [1, 23] : [1, 14]);
            const avatarName = user.gender + avatarNumber;

            if(user.gender === "m") usedAvatars.m.push(avatarNumber);
            else usedAvatars.f.push(avatarNumber);
            
            return avatars[avatarName];
        }

        function getBanner() {
            const bannerProbability = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            if(bannerProbability === 3) return "";

            if(usedBanners.length === 11) return "";

            const bunnerNumber = getRandomImageNumber([1, 11], true);
            const bunnerName = `banner${bunnerNumber}`;

            usedBanners.push(bunnerNumber);
            return banners[bunnerName];
        }

        function getRandomImageNumber(bounds, isBanner = false) {
            const [min, max] = bounds;
            const randomImageNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            let exists = false;

            const usedArray = isBanner ? usedBanners : usedAvatars;

            for(let i = 0; i < usedArray.length; i++) {
                if(usedArray[i] === randomImageNumber) exists = true;
            }

            if(exists) return getRandomImageNumber(bounds);
            return randomImageNumber;
        }
    }
}