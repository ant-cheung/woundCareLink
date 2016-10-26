import {User} from '../user/user.component';
import {UserGroup} from '../userGroup/userGroup.component';
import {UserProfile} from '../models/userProfile';

export class Message {
  constructor(
    public receiverUser: User,
    public receiverUserGroup: UserGroup,
    public content: String,
    public sender: User,
    public id: string,
    public userProfile: UserProfile,
    public dateCreated: Date,
    public parentMessageId: string) { }
}
