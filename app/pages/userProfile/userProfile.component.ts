import {Component} from '@angular/core';
import {User} from '../user/user.component';
import { NavParams } from 'ionic-angular';
import {BackendService} from '../../services/backend.service'

@Component(
    {   selector: "userProfile-item",
        templateUrl: "build/pages/userProfile/userProfile.html"
    }
)

export class UserProfile {
        public userName: String;
        public userImage: String;
        public address: String;
        public allUsers: User[] = [];

    constructor(private navParams: NavParams,private backendService: BackendService) { 
        this.userName = navParams.get('userName');
        //this.userImage = navParams.get('userImage'), 
        //this.address = navParams.get('address');
        this.allUsers = this.backendService.getUsers();
    };
}