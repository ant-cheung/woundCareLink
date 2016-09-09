import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginComponent} from '../login/login.Component';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [LoginComponent]
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }
}
