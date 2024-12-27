export const ExtendedDate = {
    format: date => {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}.`;
    },

    defaultFormat: () => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    },

    getDayDifference: date => {
        const currentDate = new Date();
        const givenDate = new Date(date);

        const difference = givenDate - currentDate;
        const dayDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

        return dayDifference + 1;
    },

    getExpirationContent: expirationDate => {
        let content= "";
        const dayDifference = ExtendedDate.getDayDifference(expirationDate);
                
        if(dayDifference < -1) content = `Expired ${Math.abs(dayDifference)} days ago`;
        else if(dayDifference === -1) content = "Expired yesterday";
        else if(!dayDifference) content = "Expires today";
        else if(dayDifference === 1) content = "Expires tomorrow";
        else content = `Expires in ${dayDifference} days`;

        return content;
    },

    getLastUsedContent: lastUsedDate => {
        let content = "";        
        const dayDifference = ExtendedDate.getDayDifference(lastUsedDate);

        if(!dayDifference) content = "Today";
        else if(dayDifference === -1) content = "Yesterday";
        else if(dayDifference < -1) content = `${Math.abs(dayDifference)} days ago`;
    
        return content;
    }
}