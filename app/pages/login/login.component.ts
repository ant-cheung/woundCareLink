import { Component } from '@angular/core';
import {AuthenticationService, User} from './authentication.service';
import { NavController } from 'ionic-angular';
import { Menu } from '../menu/menu';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'build/pages/login/login.component.html'
})

export class LoginComponent {

    constructor(private _service: AuthenticationService, private navCtrl: NavController) {

    }
    public user = new User('', '');
    public errorMsg = '';

    login() {
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login';
        }
        else {
            this.navCtrl.setRoot(Menu);
        }
    }

}

