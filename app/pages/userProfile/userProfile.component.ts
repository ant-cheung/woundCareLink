import { Component } from '@angular/core';
import { User } from '../user/user.component';
import { NavParams, Events } from 'ionic-angular';
import { BackendService } from '../../services/backend.service';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { Message } from '../models/message';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationKind } from '../models/notificationKind';
import { MessageComponent } from '../message/message.component';
import { FilterProfileMessagesPipe } from '../../pipes/filterProfileMessages';

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
    public loggedInUser: User;
    public address: String;
    public allUsers: User[] = [];
    private form: ControlGroup;
    public profileMessages: Message[];
    public recipients;
    public messageContent;
    private replytoCommentActionFunction: (message: any) => void;
    private newMessagesActionFunction: () => void;

    constructor(private navParams: NavParams, private backendService: BackendService, private authenticationService: AuthenticationService,
        public events: Events, private builder: FormBuilder) {
        this.userName = navParams.get('userName');
        this.userImage = navParams.get('userImage'),
        this.loggedInUser = this.authenticationService.getCurrentUser();
            //this.address = navParams.get('address');
            this.allUsers = this.backendService.getUsers();
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);


        // subscribe to replyToComment event
        // This is used for sending replies to messages on a user profile
        this.replytoCommentActionFunction = (message) => {
            this.replyToCommentAction(message);
        };
        this.events.subscribe('user:replyToComment', this.replytoCommentActionFunction);

        // Notified when new messages arrives via dropbox
        this.newMessagesActionFunction = () => {
            this.newMessagesAction();
        };
        this.events.subscribe('user:newMessages', this.newMessagesActionFunction);
    };

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy() {
        // Unsubscribe from events
        if (this.replytoCommentActionFunction) {
            console.log("Unsubscribed replytoCommentActionFunction: " + this.events.unsubscribe('user:replyToComment', this.replytoCommentActionFunction));
            this.replytoCommentActionFunction = undefined;
        }

        if (this.newMessagesActionFunction)
        {
          console.log("Unsubscribed newMessagesActionFunction: " + this.events.unsubscribe('user:newMessages', this.newMessagesActionFunction));
            this.newMessagesActionFunction = undefined;
        }
    }

    createForm() {
        this.recipients = new Control('', Validators.required),
            this.messageContent = new Control('', Validators.required)
        this.form = this.builder.group({
            recipients: this.recipients,
            messageContent: this.messageContent
        });
    }

    // This method is used for sending top level messages on a user profile (not replies to messages)
    sendMessage(message: any) {
        let recipients = this.form.controls['recipients'];
        let messageContent = this.form.controls['messageContent'];

        let recipientsNames: string[] = [];
        for (let recipient of recipients.value) {
            console.log("recipient: " + recipient);
            recipientsNames.push(recipient.trim())
        }

        // messageParentId is set to null since these are top level messages on a user profile
        this.CreateMessage(messageContent.value, recipientsNames, null);
    }

    CreateMessage(messageContent: String, recipientUserName: string[], messageParentId: string) {
        // Add message
        this.backendService.addMessage(this.authenticationService.getCurrentUser().userName, recipientUserName, messageContent, this.userName, messageParentId);

        // Add notification
        this.backendService.addNotification(this.authenticationService.getCurrentUser().userName, recipientUserName, this.userName, NotificationKind.Message);

        // Update profile messages
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
        console.log("profileMessagesAHF: " + JSON.stringify(this.profileMessages));
    }

    replyToCommentAction(message) {
        let messageId = String(message[0]);
        let messageContent = String(message[1]);
        console.log("message " + message);
        let messageToCommentOn = this.profileMessages.find(m => m.id === messageId);
        console.log("AHF: " + JSON.stringify(this.profileMessages) + "ADDD: " + messageId);

        let recieverUsers: string[] = [];
        for (let user of messageToCommentOn.receiverUser) {
            recieverUsers.push(user.userName);
        }

        this.CreateMessage(messageContent, recieverUsers, messageToCommentOn.id);
    }

    newMessagesAction() {
        console.log("New messages!");
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
    }
}