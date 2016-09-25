import {User} from '../user/user.component';

export class UserProfile
{
    constructor(
        public user: User,
        public userImage: String,  // path to the image location
        public address: String
    )
    {}
}