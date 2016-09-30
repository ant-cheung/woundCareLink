import {User} from '../user/user.component';
import {UserProfile} from './userProfile';
import {NotificationKind} from './notificationKind';

export class Notification {
  constructor(
    public id: Number,
    public recieveruser: User,
    public createDate: Date,
    public senderUser: UserProfile,
    public userProfile: UserProfile,
    public notificationKind: NotificationKind
  ) { }
}
