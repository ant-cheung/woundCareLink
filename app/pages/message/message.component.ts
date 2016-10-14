import {Component, Input} from '@angular/core';
import {Message} from '../models/message';
import {SendMessageComponent} from '../message/sendMessage.component';
import {BackendService} from '../../services/backend.service';

@Component(
    {
        selector: "MessageComponent-item",
        templateUrl: "build/pages/message/message.html",
        directives: [SendMessageComponent, MessageComponent]
    }
)

export class MessageComponent {
    @Input('init') message: Message;
    public showReplyDialog = false;
    public subMessages: Message[];
    public showComments = false;

    constructor(private backendService: BackendService) {
    }

    ngOnInit() {
        this.subMessages = this.backendService.getSubMessagesForMessage(this.message.id);
    }

    // Open or close the write reply... section
    openMessage() {
        if (this.showReplyDialog === true) {
            this.showReplyDialog = false;
        }
        else {
            this.showReplyDialog = true;
        }
    }

    // Open or close the comments section
    openComments() {
        if (this.showComments === true) {
            this.showComments = false;
        }
        else {
            this.showComments = true;
        }
    }
}