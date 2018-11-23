import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cashless-admin';
  showSideBar:boolean = true;
  constructor(private router: Router, private data: DataService) {

  }
  ngOnInit() {
    let currentUrl = this.router.url;
    
    console.log(this.data.currentMessage.subscribe(message => {
      console.log('message : - ', message);
      if (message == 'remove_sidebar') {
        this.showSideBar=false;
      }
    }));

  }




  message: string;

  // ngAfterViewInit() {

  // }
}
