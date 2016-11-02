import {Component} from '@angular/core';
import {BackendService} from '../../services/backend.service'
import {User} from '../user/user.component'
import {UserProfile} from '../userProfile/userProfile.component'
import { NavController } from 'ionic-angular';
import {AuthenticationService} from '../../services/authentication.service';
import {Notification} from '../models/notification'

@Component({
  templateUrl: 'build/pages/notificationList/notificationList.html',
  providers: [AuthenticationService]
})
export class NotificationList {

  notifications: Notification[] = [];

  constructor(private backendService: BackendService, private navCtrl : NavController,private _service: AuthenticationService) {
    this.initializeItems();
  }

  initializeItems() {
    this.notifications = this.backendService.getNotificationsForUser(this._service.getCurrentUser().userName);
  }

  notificationClicked(notification: Notification)
  {
      this.navCtrl.setRoot(UserProfile, { "userName": notification.userProfile.user.userName });
  }
}