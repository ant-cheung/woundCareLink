import {Component} from '@angular/core';
import {User} from '../login/user';
import { NavParams } from 'ionic-angular';

@Component(
    {   selector: "userProfile-item",
        templateUrl: "build/pages/userProfile/userProfile.html"
    }
)

export class UserProfile {
    public userName: String;
    constructor(private navParams: NavParams) { 
        this.userName = navParams.get('userName'); 
    };
}