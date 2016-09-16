import {Injectable} from '@angular/core';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

var users = [
  new User('touraj', '123'),
  new User('dss', '123')
];

@Injectable()
export class AuthenticationService {

  logout() {
    localStorage.removeItem("user");

  }

  login(user) {
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser) {
      localStorage.setItem("user", authenticatedUser.email);
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

}
