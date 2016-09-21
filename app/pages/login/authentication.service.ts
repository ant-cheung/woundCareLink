import {Injectable} from '@angular/core';
import {User} from './user';
import {BackendService} from './backend.service'

@Injectable()
export class AuthenticationService {

  constructor(private backendService: BackendService) { }

  private currentUser: User;

  logout() {
    localStorage.removeItem("user");
    this.currentUser = null;

  }

  login(user: User) {
    var authenticatedUser = this.backendService.getUsers().find(u => u.userName === user.userName);
    if (authenticatedUser) {
      localStorage.setItem("user", authenticatedUser.userName);
      this.currentUser = user;
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

  getCurrentUser(): String {
    return localStorage.getItem("user");
  }

}
