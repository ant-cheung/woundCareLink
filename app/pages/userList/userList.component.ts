import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import {BackendService} from '../../services/backend.service';
import {UserProfile} from '../userProfile/userProfile.component';
import {User} from '../user/user.component';
import {UserGroup} from '../userGroup/userGroup.component';

@Component({
    selector: 'userlist-form',
    templateUrl: 'build/pages/userList/userList.html'
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
      // Looks like .push is not working great changed to .setRoot - invesitage this...
      this.navCtrl.setRoot(UserProfile, { "userName": user.userName });
  }
}