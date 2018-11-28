import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private data:DataService,private user:UsersService) { 

  }

  ngOnInit() {
    this.user.getAllUsers().subscribe(
      data=>{
        this.users=data;
        console.log(data);
      }
    )
  }

}
