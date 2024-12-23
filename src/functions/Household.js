export const Household = {
    create: household => {
        if(!localStorage.getItem("households")) {
            const households = [household];
            localStorage.setItem("households", JSON.stringify(households));
        }

        else {
            const households = JSON.parse(localStorage.getItem("households"));
            localStorage.setItem("households", JSON.stringify([...households, household]));
        }
    }
}