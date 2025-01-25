import Gun from "gun";

const ENABLED = false;

export const gun = ENABLED ? Gun({
    peers: ["http://192.168.255.23:8765/gun"],
    batch: true
}) : null;