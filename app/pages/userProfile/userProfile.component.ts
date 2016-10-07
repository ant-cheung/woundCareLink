import {Component} from '@angular/core';
import {User} from '../user/user.component';
import { NavParams } from 'ionic-angular';
import {BackendService} from '../../services/backend.service';
import {ControlGroup, Control, Validators} from '@angular/common';
import {Message} from '../message/message.component';
import {AuthenticationService} from '../../services/authentication.service';
import {NotificationKind} from '../models/notificationKind';

@Component(
    {   selector: "userProfile-item",
        providers: [AuthenticationService],
        templateUrl: "build/pages/userProfile/userProfile.html"
    }
)

export class UserProfile {
        public userName: String;
        public userImage: String;
        public address: String;
        public allUsers: User[] = [];
        private form: ControlGroup;
        public profileMessages : Message[];

    constructor(private navParams: NavParams,private backendService: BackendService, private authenticationService: AuthenticationService) { 
        this.userName = navParams.get('userName');
        this.userImage = navParams.get('userImage'), 
        //this.address = navParams.get('address');
        this.allUsers = this.backendService.getUsers();
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
    };

    ngOnInit()
    {
        this.form = new ControlGroup({
            recipients: new Control(''),
            messageContent: new Control('')
        });
    }

    sendMessage(message: any)
    {
       let recipients = this.form.controls['recipients'];
       let messageContent = this.form.controls['messageContent'];

       // Add message
       this.backendService.addMessage(this.authenticationService.getCurrentUser().userName,recipients.value,messageContent.value,this.userName);

       // Add notification
       this.backendService.addNotification(this.authenticationService.getCurrentUser().userName,recipients.value,this.userName,NotificationKind.Message);

       // Update profile messages
       this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
    }

}