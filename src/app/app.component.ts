import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "cashless-admin";
  showSideBar: boolean = true;
  constructor(private router: Router, private userstate: DataService) {}

  ngOnInit() {
    this.userstate.getLoginState().subscribe(state => {
      this.showSideBar = state.login;
    });
  }
}
