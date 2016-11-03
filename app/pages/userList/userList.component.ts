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
    public imageSource: String;
    constructor(private navCtrl: NavController, private BackendService: BackendService, private navParams: NavParams) {
     this.title = navParams.get('title'); 
        }

    ngOnInit() {
        let userGroup: UserGroup;
        if (this.title === "Nurses")
        {
            userGroup = 0;
            this.imageSource = "img/5etYz351QpGgh0Dw9Bvz_Nursesicon.png";
        }
        else if (this.title === "Doctors")
        {
            userGroup = 1;
            this.imageSource = "img/LP9lKYSPQAWB66Ue4M9o_Physiciansicon.png";
        }        
        else if (this.title === "Patients")
        {
            userGroup = 2;
            this.imageSource = "img/dxF0CLThqXNbpdxT7xsw_RecentPationtsIcon.png";
        }
        this.users = this.LoadUserList(userGroup);
    }

    private LoadUserList(userGroup: UserGroup): User[]{
       return this.BackendService.getUsersInUserGroup(userGroup)
    }

    showUserProfilePage(user: User)
  {
      // Looks like .push is not working great changed to .setRoot - invesitage this...
      this.navCtrl.setRoot(UserProfile, { "userName": user.userName, "userImage": user.userprofileimage });
  }
}