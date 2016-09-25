import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserList} from '../userList/userList.component';
import {UserGroup} from '../userGroup/UserGroup2.component';
import {AuthenticationService} from '../../services/authentication.service';

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
        
        this.navCtrl.setRoot(UserList, { title: "Patient List" });
    }

    showNurseList() {
        this.navCtrl.setRoot(UserList, { title: "Nurse List" });
    }

    showDoctorList() {
        this.navCtrl.setRoot(UserList, { title: "Doctor List" });
    }
}