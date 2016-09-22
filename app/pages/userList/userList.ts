import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../login/user'
import {BackendService} from '../login/backend.service'
import { NavParams } from 'ionic-angular';
import {UserGroup} from '../login/usergroup'

@Component({
    selector: 'userlist-form',
    templateUrl: 'build/pages/userlist/userList.html'
})

export class UserList {

    private userGroup: UserGroup;
    public users: User[]; 
    constructor(private navCtrl: NavController, private BackendService: BackendService, private navParams: NavParams) {
     this.userGroup = navParams.get('id'); 
        }

    ngOnInit() {
        this.users = this.LoadUserList(this.userGroup);
    }

    private LoadUserList(userGroup: UserGroup): User[]{
       return this.BackendService.getUsersInUserGroup(userGroup)
    }
}