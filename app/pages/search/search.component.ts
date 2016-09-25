import {Component} from '@angular/core';
import {BackendService} from '../../services/backend.service'
import {User} from '../user/user.component'
import {UserProfile} from '../userProfile/userProfile.component'
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {

  searchQuery: string = '';
  items: User[] = [];


  constructor(private backendService: BackendService, private navCtrl : NavController) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = this.backendService.getUsers();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.userName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  showUserProfilePage(user: User)
  {
      this.navCtrl.push(UserProfile, { "userName": user.userName });
  }
}