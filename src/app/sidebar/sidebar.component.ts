import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { ACTION_LOGOUT, ACTION_LOGIN } from "../store/actions/appActions";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private data: DataService) {
    let user = localStorage.getItem("user");
    if (!user && router.url != "/login") {
      this.router.navigate(["login"]);
    }

    if (user && router.url == "/login") {
      this.router.navigate([""]);
    }
  }

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
