import {Component, Input} from '@angular/core';
import {Message} from '../models/message';
import {ControlGroup, Control, Validators} from '@angular/common';
import { Events } from 'ionic-angular';
import { User } from '../user/user.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component(
    {
        selector: "SendMessageComponent-item",
        templateUrl: "build/pages/message/sendMessage.html",
        providers: [AuthenticationService]
    }
)

export class SendMessageComponent {
    @Input('init') message: Message;
    private form: ControlGroup;
    public loggedInUser: User;

    constructor(public events: Events, private authenticationService: AuthenticationService) {
                this.loggedInUser = this.authenticationService.getCurrentUser();
     }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = new ControlGroup({
            messageReplyContent: new Control('', Validators.required)
        });
    }

    sendMessage(newMessage: any) {
        let messageReplyContent = this.form.controls['messageReplyContent'];
        this.events.publish('user:replyToComment', this.message.id, messageReplyContent.value);
        // Reset form
      //  this.createForm();
    }
}