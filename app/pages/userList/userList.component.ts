import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import {BackendService} from '../../services/backend.service'
import {User} from '../user/user.component'
import {UserGroup} from '../userGroup/userGroup.component'

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