import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home.component';

import {BackendService} from './services/backend.service';

import { UserList} from './pages/userList/userList.component';
import { Landing} from './pages/landing/landing.component';
import { SearchPage} from './pages/search/search.component';
import { NotificationList} from './pages/notificationList/notificationList.component';

@Component({
  templateUrl: 'build/app.html',
  providers: [BackendService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // set our app's pages
    this.pages = [
      { title: 'Patient List', component: UserList },
      { title: 'Nurse List', component: UserList },
      { title: 'Doctor List', component: UserList },
      { title: 'Search', component: SearchPage },
      { title: 'Notifications', component: NotificationList },
      { title: 'Dashboard', component: Landing },
      { title: 'Logout', component: HomePage }
    ];

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, { title: page.title });
  }

}

ionicBootstrap(MyApp);
