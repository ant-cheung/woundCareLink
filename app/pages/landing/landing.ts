import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserList} from '../userList/userList';
import {UserGroup} from '../login/UserGroup2';
import {AuthenticationService} from '../login/authentication.service';

@Component({
    selector: 'landing-form',
    providers: [AuthenticationService],
    templateUrl: 'build/pages/landing/landing.html'
})

export class Landing {

public user: String;
    constructor(private navCtrl: NavController,private _service: AuthenticationService) {
    }

    ngOnInit() {
         console.log("getting user : ");
            console.log(this._service.getCurrentUser());
           // console.log("" + UserGroup.patient);
            this.user = this._service.getCurrentUser();
           // console.log("asdasd" + this.user1.userName )
    }

    showPatientList() {
        
        this.navCtrl.setRoot(UserList, { id: UserGroup.patient });
    }

    showNurseList() {
        this.navCtrl.setRoot(UserList, { id: 0 });
    }

    showDoctorList() {
        this.navCtrl.setRoot(UserList, { id: 1 });
    }
}