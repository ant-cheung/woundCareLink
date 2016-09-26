import {Component} from '@angular/core';
import {User} from '../user/user.component';
import { NavParams } from 'ionic-angular';
import {BackendService} from '../../services/backend.service';
import {ControlGroup, Control, Validators} from '@angular/common';

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
        form;

    constructor(private navParams: NavParams,private backendService: BackendService) { 
        this.userName = navParams.get('userName');
        //this.userImage = navParams.get('userImage'), 
        //this.address = navParams.get('address');
        this.allUsers = this.backendService.getUsers();
    };

    ngOnInit()
    {
        this.form = new ControlGroup({
            'recipients': new Control(''),
            'messageContent': new Control('')
        });
    }

    sendMessage(message)
    {
        console.log(message);
    }
}