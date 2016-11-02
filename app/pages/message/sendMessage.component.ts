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
            messageContent: new Control('', Validators.required)
        });
    }

    sendMessage(newMessage: any) {
        let messageContent = this.form.controls['messageContent'];
        this.events.publish('user:replyToComment', this.message.id, messageContent.value);
        // Reset form
      //  this.createForm();
    }
}