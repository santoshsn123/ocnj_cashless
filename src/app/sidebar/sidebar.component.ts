import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { ACTION_LOGOUT, ACTION_LOGIN } from "../store/actions/appActions";
import { LocalStorage } from "@ngx-pwa/local-storage";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private data: DataService,
    private localSt: LocalStorage
  ) {
    this.localSt.getItem("user").subscribe(user => {
      if (!user && router.url != "/login") {
        this.router.navigate(["login"]);
      }

      if (user && router.url == "/login") {
        this.router.navigate([""]);
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.localSt.clear().subscribe(() => {});
    this.router.navigate(["login"]);
  }
}
