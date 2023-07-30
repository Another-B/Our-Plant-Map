import { Group } from "./group";
import { User } from "./user";
import { UserGroup } from "./user.group";

export class UserApplicationService {
    constructor(private group: Group, private user: User, private userGroup: UserGroup) {}
}
