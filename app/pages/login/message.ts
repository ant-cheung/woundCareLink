import {UserProfile} from './userProfile';
import {User} from './user';
import {UserGroup} from './UserGroup'

export class Message {
  constructor(
    public receiverUser: User,
    public receiverGroup: UserGroup,
    public content: String,
    public sender: User,
    public id: Number) { }
}