import {Component} from '@angular/core';
import {User} from '../user/user.component';
import { NavParams } from 'ionic-angular';

@Component(
    {   selector: "userProfile-item",
        templateUrl: "build/pages/userProfile/userProfile.html"
    }
)

export class UserProfile {
        public userName: String;
        public userImage: String;
        public address: String;

    constructor(private navParams: NavParams) { 
        this.userName = navParams.get('userName');
        //this.userImage = navParams.get('userImage'), 
        //this.address = navParams.get('address');
    };
}