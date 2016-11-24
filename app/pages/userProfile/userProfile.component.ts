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
    private updateMessageActionFunction: (message: any) => void;

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

        this.updateMessageActionFunction = (message) => {
            this.updateMessage(message);
        };
        this.events.subscribe('user:updateMessage', this.updateMessageActionFunction);
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

         if (this.updateMessageActionFunction) {
            console.log("Unsubscribed updateMessageActionFunction: " + this.events.unsubscribe('user:updateMessage', this.updateMessageActionFunction));
            this.updateMessageActionFunction = undefined;
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
            recipientsNames.push(recipient.trim())
        }

        if (recipientsNames.length === 0)
        {
            recipientsNames.push(this.allUsers[0].userName)
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

    updateMessage(message: any)
    {
        this.backendService.updateMessage(message[0] as Message);
    }

    replyToCommentAction(message) {
        let messageId = String(message[0]);
        let messageContent = String(message[1]);

        let messageToCommentOn = this.profileMessages.find(m => m.id === messageId);

        let recieverUsers: string[] = [];
        for (let user of messageToCommentOn.receiverUser) {

            // Do not include current user in receiver users
            if (user.userName !== this.authenticationService.getCurrentUser().userName)
            {
                recieverUsers.push(user.userName);
            }
        }

        // Add the sender of the message to comment on
        recieverUsers.push(messageToCommentOn.sender.userName);

        this.CreateMessage(messageContent, recieverUsers, messageToCommentOn.id);
    }

    newMessagesAction() {
        console.log("New messages!");
        this.profileMessages = this.backendService.getMessagesForUserProfile(this.userName);
    }
}