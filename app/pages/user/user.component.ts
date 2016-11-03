import {UserGroup} from '../userGroup/userGroup.component';

export class User {
  constructor(
    public id: Number,
    public userName: string,
    public password: string,
    public userGroup: UserGroup,
    public userprofileimage: String
  ){ }
}