import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home.component';
import {BackendService} from './services/backend.service';
import { UserList} from './pages/userList/userList.component';
import { Landing} from './pages/landing/landing.component';
import { SearchPage} from './pages/search/search.component';
import { NotificationList} from './pages/notificationList/notificationList.component';
import { User} from './pages/user/user.component';
import {AuthenticationService} from './services/authentication.service';

@Component({
  templateUrl: 'build/app.html',
  providers: [BackendService,AuthenticationService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  currentUser: User;

  constructor(public platform: Platform,public menu: MenuController, public events: Events, private authService: AuthenticationService ) {
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
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, { title: page.title });
    }
}

ionicBootstrap(MyApp);
