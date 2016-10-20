import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserList} from '../userList/userList.component';
import {User} from '../user/user.component';
import {UserGroup} from '../userGroup/UserGroup2.component';
import {AuthenticationService} from '../../services/authentication.service';
import { SearchPage } from '../search/search.component';
import { NotificationList } from '../notificationList/notificationList.component';
import {BackendService} from '../../services/backend.service'

@Component({
    selector: 'landing-form',
    providers: [AuthenticationService],
    templateUrl: 'build/pages/landing/landing.html'
})

export class Landing {

public user: User;

    public notificationCount: Number;

    constructor(private navCtrl: NavController,private _service: AuthenticationService, public alertCtrl: AlertController, private backendService: BackendService) {
    }

    ngOnInit() {
         console.log("getting user : ");
            console.log(this._service.getCurrentUser());
           // console.log("" + UserGroup.patient);
            this.user = this._service.getCurrentUser();
           // console.log("asdasd" + this.user1.userName )

           // Get notifications for user and show Alert if there are any
           let notifications = this.backendService.getNotificationsForUser(this.user.userName);
           this.notificationCount = notifications.length;
           if (this.notificationCount> 0)
           {
                this.showNotificationAlert();
           }
    }

    showPatientList() {
        
        this.navCtrl.setRoot(UserList, { title: "Patients" });
    }

    showNurseList() {
        this.navCtrl.setRoot(UserList, { title: "Nurses" });
    }

    showDoctorList() {
        this.navCtrl.setRoot(UserList, { title: "Doctors" });
    }

    showNotification(){
        this.navCtrl.setRoot(NotificationList);
    }

    showSearch(){
        this.navCtrl.setRoot(SearchPage);
    }

    showNotificationAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Notifications!',
      subTitle: 'You have new unread messages!',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Open',
          handler: data => {
            console.log('Open Notification clicked');
            this.showNotification();
          }
        }
      ]
    });
    alert.present();
  }
}