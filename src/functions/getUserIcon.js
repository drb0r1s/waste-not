import { users } from "../data/users";
import { images } from "../data/images";

export function getUserIcon(member) {
    let icon;

    if(typeof member.id === "string" && member.icon) icon = member.icon;
    else if(typeof member.id === "string") icon = images.noAvatarIcon;
    
    else {
        let user;

        for(let i = 0; i < users.length; i++) if(users[i].id === member.id) {
            user = users[i];
            break;
        }

        if(user?.icon) icon = user.icon;
        else icon = images.noAvatarIcon;
    }

    return icon;
}