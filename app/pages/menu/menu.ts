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

    public user: String;
    constructor(
        private _service: AuthenticationService, private navCtrl: NavController) { 
        }

    ngOnInit() {
        if (!this._service.checkCredentials()) {
            this.navCtrl.setRoot(LoginComponent);
        }
        else
        {
            console.log("getting user : ");
            console.log(this._service.getCurrentUser());
            this.user = this._service.getCurrentUser();
        }
    }

    logout() {
        this.navCtrl.setRoot(LoginComponent);
    }

    showPatientList() {
        this.navCtrl.setRoot(LoginComponent);
    }
}
