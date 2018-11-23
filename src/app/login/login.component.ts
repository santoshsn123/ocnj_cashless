import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // let showData
  visibal: string;
  visible:true;
  message='some Message';
  constructor(private router: Router,private data:DataService) {
    this.visibal = 'yes new one';
    // if(router.url)
    console.log(router.url);
    data.changeMessage('remove_sidebar');
  }

ngOnInit() {
}

}
