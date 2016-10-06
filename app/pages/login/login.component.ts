import { Component } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../user/user.component';
import { NavController } from 'ionic-angular';
import { Landing } from '../landing/landing.component';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'build/pages/login/login.component.html'
})

export class LoginComponent {

    constructor(private _service: AuthenticationService, private navCtrl: NavController) {

    }
    public user: User = new User(-1,'','',null);
    public errorMsg = '';

    login() {
        // Change username to lowercase
        this.user.userName = this.user.userName.toLowerCase();
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login! Username or Password is invalid.';
        }
        else {
            this.navCtrl.setRoot(Landing);
        }
    }

}

