import {Component} from '@angular/core';
import {User} from '../user/user.component';
import { NavParams, Events } from 'ionic-angular';
import {BackendService} from '../../services/backend.service';
import {ControlGroup, Control, Validators} from '@angular/common';
import {Message} from '../models/message';
import {AuthenticationService} from '../../services/authentication.service';
import {NotificationKind} from '../models/notificationKind';
import {MessageComponent} from '../message/message.component';
import {FilterProfileMessagesPipe} from '../../pipes/filterProfileMessages';

@Component(
    {
        selector: "userProfile-item",
        providers: [AuthenticationService],
        templateUrl: "build/pages/userProfile/userProfile.html",
        directives: [MessageComponent],
        pipes: [FilterProfileMessagesPipe]
    }
)

export class UserProfile {
    public userName: String;
    public userImage: String;
    public address: String;
    public allUsers: User[] = [];
    private form: ControlGroup;
    public profileMessages: Message[];

    constructor(private navParams: NavParams, private backendService: BackendService, private authenticationService: AuthenticationService,
        public events: Events) {
        this.userName = navParams.get('userName');
        this.userImage = navParams.get('userImage'),
            //this.address = navParams.get('address');
            this.allUsers = this.backendService.getUsers();
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);

        // subscribe to replyToComment event
        // This is used for sending replies to messages on a user profile
        this.events.subscribe('user:replyToComment', (message) => {
            let messageId = String(message[0]);
            let messageContent = String(message[1]);
            console.log("message " + message);
            let messageToCommentOn = this.profileMessages.find(m => m.id === messageId);
            this.CreateMessage(messageContent, messageToCommentOn.receiverUser.userName, messageToCommentOn.id);
        });

        // Notified when new messages arrives via dropbox
         this.events.subscribe('user:newMessages', () => {
            console.log("New messages!");
            this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
        });
    };

    ngOnInit() {
        this.form = new ControlGroup({
            recipients: new Control('', Validators.required),
            messageContent: new Control('', Validators.required)
        });
    }

    // This method is used for sending top level messages on a user profile (not replies to messages)
    sendMessage(message: any) {
        let recipients = this.form.controls['recipients'];
        let messageContent = this.form.controls['messageContent'];

        console.log("recipients" + recipients.value);
        // messageParentId is set to null since these are top level messages on a user profile
        this.CreateMessage(messageContent.value, recipients.value, null);
    }

    CreateMessage(messageContent: String, recipientUserName: String, messageParentId: string) {
        // Add message
        this.backendService.addMessage(this.authenticationService.getCurrentUser().userName, recipientUserName, messageContent, this.userName, messageParentId);

        // Add notification
        this.backendService.addNotification(this.authenticationService.getCurrentUser().userName, recipientUserName, this.userName, NotificationKind.Message);

        // Update profile messages
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
    }
}