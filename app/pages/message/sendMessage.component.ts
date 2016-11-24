import {Component, Input} from '@angular/core';
import {Message} from '../models/message';
import {ControlGroup, Control, Validators} from '@angular/common';
import { Events } from 'ionic-angular';

@Component(
    {
        selector: "SendMessageComponent-item",
        templateUrl: "build/pages/message/sendMessage.html",
    }
)

export class SendMessageComponent {
    @Input('init') message: Message;
    private form: ControlGroup;

    constructor(public events: Events) { }

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