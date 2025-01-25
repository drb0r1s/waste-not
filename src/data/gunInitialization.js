import Gun from "gun";

export const gun = Gun({
    peers: ["http://192.168.255.23:8765/gun"],
    batch: true
});