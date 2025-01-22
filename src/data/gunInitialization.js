import Gun from "gun";

export const gun = Gun({
    peers: ["https://gun-manhattan.herokuapp.com/gun"]
});