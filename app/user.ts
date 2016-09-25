import {UserGroup} from './userGroup';

export class User {
  constructor(
    public id: Number,
    public userName: string,
    public password: string,
    public userGroup: UserGroup
  ){ }
}