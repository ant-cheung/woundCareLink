import {Injectable} from '@angular/core';
import {User} from '../pages/user/user.component';
import {UserGroup} from '../pages/userGroup/userGroup.component';
import {UserProfile} from '../pages/models/userProfile';
import {Notification} from '../pages/models/notification';
import {Message} from '../pages/models/message';
import {NotificationKind} from '../pages/models/notificationKind';
import {Dropbox} from './dropbox';
import {Observable} from 'rxjs/Rx';
import { Events } from 'ionic-angular';

@Injectable()
export class BackendService {

  private msgGuidList: string[] = [];
  private notificationGuidList: string[] = [];

  constructor(private dropbox: Dropbox, public events: Events) {
    // Run syncMessagesWithDropbox() method on interval to sync new messages
    Observable.interval(10000)
      .map((x) => x + 1)
      .subscribe((x) => {
        this.syncMessagesWithDropbox();
      });
  }

  addMessage(senderUserName: String, receiverUserName: String, messageContent: String, profileUserName: String, parentMessageId: string): void {

    // Add new Guid for message id
    let messageId = Guid.newGuid();
    this.msgGuidList.push(messageId);
    let sender = this.users.find(u => u.userName === senderUserName);
    let receiver = this.users.find(u => u.userName === receiverUserName);
    let userProfile = this.UserProfiles.find(u => u.user.userName === profileUserName);
    let message = new Message(receiver, null, messageContent, sender, messageId, userProfile, new Date(), parentMessageId);

    // Add message to localStorage
    localStorage.setItem(message.id, JSON.stringify(message));
    console.log("Add message successfuly: " + localStorage.getItem(message.id));

    // Upload to dropbox
    this.dropbox.uploadFile(message.id, JSON.stringify(message)).subscribe(data => {
      console.log("result of upload file: " + JSON.stringify(data));
    }, (err) => {
      console.log("error in upload file: " + err);
    });
  }

  addNotification(senderUserName: String, receiverUserName: String, profileUserName: String, notificationKind: NotificationKind): void {

    // Add new Guid for notification id
    let notificationId = Guid.newGuid();
    this.notificationGuidList.push(notificationId);
    let receiver = this.users.find(u => u.userName === receiverUserName);
    let sender = this.UserProfiles.find(u => u.user.userName === senderUserName);
    let userProfile = this.UserProfiles.find(u => u.user.userName === profileUserName);
    let notification = new Notification(notificationId, receiver, new Date(), sender, userProfile, notificationKind);

    // Add notification to localStorage
    localStorage.setItem(notification.id, JSON.stringify(notification));
    console.log("Add notification successfuly: " + localStorage.getItem(notification.id));
  }

  getMessagesForUserProfile(userProfileName: String): Message[] {
    console.log("getting messages for userProfile name: " + userProfileName);
    let messages = [];

    // Go through messages to find matching userProfile
    for (let i = 0; i < this.msgGuidList.length; i++) {
      let msg = localStorage.getItem(this.msgGuidList[i]);
      let message = JSON.parse(msg) as Message;
      if (message !== null && message.userProfile.user.userName === userProfileName) {
        console.log("Matching message found adding to profile: " + message.content);
        messages.push(message);
      }
    }
    console.log("Total messages: " + messages.length + "retrieved for userProfilename: " + userProfileName);
    return messages;
  }

  getNotificationsForUser(userName: String): Notification[] {
    console.log("getting notifications for userName: " + userName);
    let notifications = [];

    // Go through notifications to find matching
    for (let i = 0; i < this.notificationGuidList.length; i++) {
      let msg = localStorage.getItem(this.notificationGuidList[i]);
      let notification = JSON.parse(msg) as Notification;
      if (notification !== null && notification.recieveruser.userName === userName) {
        console.log("Matching notification found adding to notification list: " + notification.id);
        notifications.push(notification);
      }
    }
    console.log("Total notifications: " + notifications.length + "retrieved for userName: " + userName);
    return notifications;
  }

  getSubMessagesForMessage(messageId: String): Message[] {
    console.log("getting sub messages for message Id: " + messageId);
    let messages = [];

    // Go through messages to find matching sub message
    for (let i = 0; i < this.msgGuidList.length; i++) {
      let msg = localStorage.getItem(this.msgGuidList[i]);
      let message = JSON.parse(msg) as Message;
      if (message !== null && message.parentMessageId === messageId) {
        console.log("Matching sub message found adding: " + message.content);
        messages.push(message);
      }
    }
    console.log("Total sub messages: " + messages.length + "retrieved for message Id: " + messageId);
    return messages;
  }

  public getUsers(): User[] {
    console.log("get Users, size: " + this.users.length);
    return this.users;
  }

  public getUsersInUserGroup(userGroup: UserGroup): User[] {
    console.log("getting users for userGroup: " + userGroup);
    return this.users.filter(u => u.userGroup === userGroup);
  }

  public getUserProfiles(): UserProfile[] {
    return this.UserProfiles;
  }

  syncMessagesWithDropbox() {
    // First get all message files in the dropbox folder
    this.dropbox.getFolders("/WoundCareAppData/Messages/").subscribe(data => {
      let folderList: any[];
      folderList = data.entries;
      console.log("result of get folders: " + JSON.stringify(folderList));

      // Only download those that are not in local storage (or msgGuidList)
      let toDownloadList: string[] = [];
      for (let file of folderList) {
        let fileName = file.name as string;
        if (this.msgGuidList.indexOf(fileName.slice(0, fileName.length - 4)) === -1) {
          console.log("New message file to download!: " + fileName);
          toDownloadList.push(fileName);
        }
      }

      // Perform download on each file in toDownloadList
      toDownloadList.forEach(f => this.dropbox.downloadFile(f).subscribe(data => {
        console.log("message:" + JSON.stringify(data));
        let message = data as Message;

        // Add downloaded message to localStorage and msgGuidList
        this.msgGuidList.push(message.id);
        localStorage.setItem(message.id, JSON.stringify(message));
        console.log("Add message successfuly: " + localStorage.getItem(message.id));

        // Trigger event for newMessages (userProfile is listening)
        this.events.publish('user:newMessages');
      }, (err) => {
        console.log(err);
      }));
    }, (err) => {
      console.log("error in get folders: " + err);
    });
  }

  users = [
    new User(1, 'nurse1', '123', UserGroup.nurse),
    new User(2, 'nurse2', '123', UserGroup.nurse),
    new User(3, 'nurse3', '123', UserGroup.nurse),
    new User(4, 'nurse4', '123', UserGroup.nurse),
    new User(5, 'patient1', '123', UserGroup.patient),
    new User(6, 'patient2', '123', UserGroup.patient),
    new User(7, 'patient3', '123', UserGroup.patient),
    new User(8, 'doctor1', '123', UserGroup.doctor),
    new User(9, 'doctor2', '123', UserGroup.doctor),
    new User(10, 'doctor3', '123', UserGroup.doctor),
    new User(11, 'doctor4', '123', UserGroup.doctor)
  ];

  UserProfiles = [
    new UserProfile(this.users.find(u => u.id === 1), 'img/nurse.png'),
    new UserProfile(this.users.find(u => u.id === 2), 'img/nurse.png'),
    new UserProfile(this.users.find(u => u.id === 3), 'img/nurse.png'),
    new UserProfile(this.users.find(u => u.id === 4), 'img/nurse.png'),
    new UserProfile(this.users.find(u => u.id === 5), 'img/patient.png'),
    new UserProfile(this.users.find(u => u.id === 6), 'img/patient.png'),
    new UserProfile(this.users.find(u => u.id === 7), 'img/patient.png'),
    new UserProfile(this.users.find(u => u.id === 8), 'img/doctor.png'),
    new UserProfile(this.users.find(u => u.id === 9), 'img/doctor.png'),
    new UserProfile(this.users.find(u => u.id === 10), 'img/doctor.png'),
    new UserProfile(this.users.find(u => u.id === 11), 'img/doctor.png'),
  ];
}

// This class creates unique Guids used for message and notification Ids
class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
