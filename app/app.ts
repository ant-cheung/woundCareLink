import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, MenuController, Nav, Events, AlertController} from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home.component';
import {BackendService} from './services/backend.service';
import { UserList} from './pages/userList/userList.component';
import { Landing} from './pages/landing/landing.component';
import { SearchPage} from './pages/search/search.component';
import { NotificationList} from './pages/notificationList/notificationList.component';
import { User} from './pages/user/user.component';
import {AuthenticationService} from './services/authentication.service';
import {Dropbox} from './services/dropbox';
import { UserProfile } from './pages/models/userProfile';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  templateUrl: 'build/app.html',
  providers: [BackendService, AuthenticationService, Dropbox, HTTP_PROVIDERS]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;
  currentUser: User;
  alertIsShown: boolean = false;

  constructor(public platform: Platform, public menu: MenuController, public events: Events, private authService: AuthenticationService, public alertCtrl: AlertController, private backendService: BackendService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: Landing },
      { title: 'Patients', component: UserList },
      { title: 'Nurses', component: UserList },
      { title: 'Doctors', component: UserList },
      { title: 'Search', component: SearchPage },
      { title: 'Notifications', component: NotificationList },
      { title: 'Logout', component: HomePage }
    ];

    // subscribe to signin event
    this.events.subscribe('user:signin', () => {
      this.currentUser = this.authService.getCurrentUser();
    });

    // subscribe to newNotifications event
    this.events.subscribe('user:newNotifications', () => {
      if (!this.alertIsShown) {
        // Get notifications for user and show Alert if there are any
        if (this.currentUser !== undefined) {
          let notifications = this.backendService.getNotificationsForUser(this.currentUser.userName);
          if (notifications.length > 0) {
            this.showNotificationAlert();
          }
        }
      }
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, { title: page.title });
  }

  showNotificationAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Notifications!',
      subTitle: 'You have new unread messages!',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.handleNotificationAlertSubmit(false);
          }
        },
        {
          text: 'Open',
          handler: data => {
            this.handleNotificationAlertSubmit(true);
          }
        }
      ]
    });
    alert.present();
    this.alertIsShown = true;
  }

  handleNotificationAlertSubmit(ShowNotificationList: boolean) {
    if (ShowNotificationList) {
      this.nav.setRoot(NotificationList);
    }
    this.alertIsShown = false;
  }

    showUserProfilePage(user: User)
  {
    // close the menu when clicking a link from the menu
    this.menu.close();
      // Looks like .push is not working great changed to .setRoot - invesitage this...
      this.nav.setRoot(UserProfile, { "userName": user.userName, "userImage": user.userprofileimage });
  }
}



ionicBootstrap(MyApp, [HTTP_PROVIDERS]);
