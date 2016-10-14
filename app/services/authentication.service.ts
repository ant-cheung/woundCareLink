import {Injectable} from '@angular/core';
import {User} from '../pages/user/user.component';
import {BackendService} from './backend.service';
import { Events } from 'ionic-angular';

@Injectable()
export class AuthenticationService {

  constructor(private backendService: BackendService,public events: Events) { }

  private currentUser: User;

  logout() {
    localStorage.removeItem("user");
    this.currentUser = null;

  }

  login(user: User) {
    var authenticatedUser = this.backendService.getUsers().find(u => u.userName === user.userName);
    if (authenticatedUser) {
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      console.log("usergroup:" + authenticatedUser.userGroup);
      this.currentUser = authenticatedUser;
      
      // Publish event for user signin, to use by app.ts  
      this.events.publish('user:signin');
      
      return true;
    }
    return false;
  }

  checkCredentials() {
    if (localStorage.getItem("user") === null) {
      return false;
    }
    else { return true; }
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem("user")) as User;
  }

}
