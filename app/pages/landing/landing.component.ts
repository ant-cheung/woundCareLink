import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserList} from '../userList/userList.component';
import {User} from '../user/user.component';
import {UserGroup} from '../userGroup/UserGroup2.component';
import {AuthenticationService} from '../../services/authentication.service';
import { SearchPage } from '../search/search.component';
import { NotificationList } from '../notificationList/notificationList.component';

@Component({
    selector: 'landing-form',
    providers: [AuthenticationService],
    templateUrl: 'build/pages/landing/landing.html'
})

export class Landing {

public user: User;
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
        
        this.navCtrl.setRoot(UserList, { title: "Patients" });
    }

    showNurseList() {
        this.navCtrl.setRoot(UserList, { title: "Nurses" });
    }

    showDoctorList() {
        this.navCtrl.setRoot(UserList, { title: "Doctors" });
    }

    showNotification(){
        this.navCtrl.setRoot(NotificationList);
    }

    showSearch(){
        this.navCtrl.setRoot(SearchPage);
    }
}