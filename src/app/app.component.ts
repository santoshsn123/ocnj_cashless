import { Component } from "@angular/core";
// import { Router } from "@angular/router";
import { Router, NavigationStart } from "@angular/router";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  // let currentUser = JSON.parse(localStorage.getItem("user"));
  title = "cashless-admin";
  showSideBar: boolean = true;
  constructor(private router: Router, private userstate: DataService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let currentUser = JSON.parse(localStorage.getItem("user"));
        if (event.url != "/login" && !currentUser) {
          this.router.navigate(["login"]);
        }

        if (event.url == "/login" && currentUser) {
          this.router.navigate(["dashboard"]);
        }
      }
    });
  }

  ngOnInit() {
    // this.userstate.getLoginState().subscribe(state => {
    //   this.showSideBar = state.login;
    // });

    let currentUser = JSON.parse(localStorage.getItem("user"));
    this.userstate.getLoginState().subscribe(state => {
      this.showSideBar = state.login;
    });
    this.showSideBar = currentUser ? true : false;
  }
}
