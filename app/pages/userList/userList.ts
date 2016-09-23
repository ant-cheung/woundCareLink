import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../login/user'
import {BackendService} from '../login/backend.service'
import { NavParams } from 'ionic-angular';
import {UserGroup} from '../login/usergroup'
import {UserProfile} from '../userProfile/userProfile'

@Component({
    selector: 'userlist-form',
    templateUrl: 'build/pages/userlist/userList.html'
})

export class UserList {

    public title: String;
    public users: User[]; 
    constructor(private navCtrl: NavController, private BackendService: BackendService, private navParams: NavParams) {
     this.title = navParams.get('title'); 
        }

    ngOnInit() {
        let userGroup: UserGroup;
        if (this.title === "Nurse List")
        {
            userGroup = 0;
        }
        else if (this.title === "Doctor List")
        {
            userGroup = 1;
        }        
        else if (this.title === "Patient List")
        {
            userGroup = 2;
        }
        this.users = this.LoadUserList(userGroup);
    }

    private LoadUserList(userGroup: UserGroup): User[]{
       return this.BackendService.getUsersInUserGroup(userGroup)
    }

    showUserProfilePage(user: User)
  {
      this.navCtrl.push(UserProfile, { "userName": user.userName });
  }
}