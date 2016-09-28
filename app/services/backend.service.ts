import {Injectable} from '@angular/core';
import {User} from '../pages/user/user.component';
import {UserGroup} from '../pages/userGroup/userGroup.component';
import {UserProfile} from '../pages/models/userProfile';
import {Message} from '../pages/message/message.component';

// var messages = [];

@Injectable()
export class BackendService {

  //   deleteMessage(message: Message): void {
  //     localStorage.removeItem("message" + message.id);
  //   }

  constructor() {
    // MessageCount is temprory here because localstorage functionality is limited: only stores key valuee  - not needed once database is hooked up.
    localStorage.setItem("messageCount", String(0));
  }

  addMessage(senderUserName: String, receiverUserName: String, messageContent: String, profileUserName: String): void {
    // Increase messageCount
    let messageCount = Number(localStorage.getItem("messageCount")) + 1;
    localStorage.setItem("messageCount", String(messageCount));

    let sender = this.users.find(u => u.userName === senderUserName);
    let receiver = this.users.find(u => u.userName === receiverUserName);
    let userProfile = this.UserProfiles.find(u => u.user.userName === profileUserName);
    let message = new Message(receiver, null, messageContent, sender, Number(messageCount), userProfile, new Date());

    // Add message to localStorage
    localStorage.setItem("message" + message.id, JSON.stringify(message));
    console.log("Add message successfuly: " + localStorage.getItem("message" + message.id));
  }

  getMessagesForUserProfile(userProfileName: String): Message[] {
    console.log("getting messages for userProfile name: " + userProfileName);
    let messages = [];
    let messageCount = Number(localStorage.getItem("messageCount"));

    // Go through messages to find matching userProfile
    for (let i = 1; i < messageCount + 1; i++) {
      let msg = localStorage.getItem("message" + i);
      let message = JSON.parse(msg) as Message;
      if (message !== null && message.userProfile.user.userName === userProfileName) {
         console.log("Matching message found adding to profile: " + message.content);
        messages.push(message);
      }
    }
    console.log("Total messages: " + messages.length +  "retrieved for userProfilename: " + userProfileName);
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

  Messages: Message[];

}
