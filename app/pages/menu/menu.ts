import {Component} from '@angular/core';
import {AuthenticationService} from '../login/authentication.service';
import { NavController } from 'ionic-angular';
import { LoginComponent} from '../login/login.Component';

@Component({
    selector: 'menu-form',
    providers: [AuthenticationService],
    templateUrl: 'build/pages/menu/menu.html'
})

export class Menu {

    constructor(
        private _service: AuthenticationService, private navCtrl: NavController) { }

    ngOnInit() {
        if (!this._service.checkCredentials()) {
            this.navCtrl.setRoot(LoginComponent);
        }
    }

    logout() {
        this.navCtrl.setRoot(LoginComponent);
    }
}
