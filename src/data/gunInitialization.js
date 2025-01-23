import Gun from "gun";

export const gun = Gun({
    // https://gun-manhattan.herokuapp.com/gun
    peers: ["https://gun-relay-production.up.railway.app/gun"],
    batch: true
});