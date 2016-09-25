import {Injectable} from '@angular/core';
import {User} from '../pages/user/user.component';
import {UserGroup} from '../pages/userGroup/userGroup.component';
import {UserProfile} from '../pages/userProfile/userProfile.component';

// var messages = [];

@Injectable()
export class BackendService {

//   deleteMessage(message: Message): void {
//     localStorage.removeItem("message" + message.id);
//   }


//   addMessage(message: Message): void {
//     localStorage.setItem("message" + message.id, JSON.stringify(message));

//     // Increase messageCount
//     var messageCount = localStorage.getItem("messageCount") + 1;
//     localStorage.setItem("messageCount", messageCount)
//   }

//  getMessagesForRecipient(recipient: User): Array<Message>
//  {
//    var messageCount = localStorage.getItem("messageCount");

//    // Go through messages to find matching recipient
//    for(var i=1; i<messageCount + 1; i++)
//    {
//       var msg = localStorage.getItem("message" + messageCount);
//       if (msg !== null)
//       {
        
//       }
//    }
//    return localStorage.getItem("user");
//  }

 public getUsers(): User[]
 {
   console.log("get Users, size: " + this.users.length);
   return this.users;
 }

public getUsersInUserGroup(userGroup: UserGroup): User[]
 {
   console.log("getting users for userGroup: " + userGroup);
   return this.users.filter(u => u.userGroup === userGroup);
 }

 public getUserProfiles(): UserProfile[]
 {
   return this.UserProfiles;
 }

 users = [
  new User(1, 'nurse1', '123', UserGroup.nurse),
  new User(1, 'nurse2', '123', UserGroup.nurse),
  new User(1, 'nurse3', '123', UserGroup.nurse),
  new User(1, 'nurse4', '123', UserGroup.nurse),
  new User(2, 'patient1', '123', UserGroup.patient),
  new User(2, 'patient2', '123', UserGroup.patient),
  new User(2, 'patient3', '123', UserGroup.patient),
  new User(3, 'doctor1', '123', UserGroup.doctor),
  new User(3, 'doctor2', '123', UserGroup.doctor),
  new User(3, 'doctor3', '123', UserGroup.doctor),
  new User(3, 'doctor4', '123', UserGroup.doctor)
];

UserProfiles = [
  //new UserProfile(this.users.find(u => u.id === 1),'img/nurse.png', "Vancouver"),
  //new UserProfile(this.users.find(u => u.id === 2),'img/patient.png', "Vancouver"),
  //new UserProfile(this.users.find(u => u.id === 3),'img/doctor.png', "Vancouver"),
];

}
