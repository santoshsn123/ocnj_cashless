import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  userValue;
  gift_card_transaction;
  purchased_transaction;
  userdata;
  bucks;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  itemsPerPage_gift: number = 10;
  currentPage_gift: number = 1;
  userId: number;
  userDetails: Object;

  constructor(
    private data: DataService,
    private user: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => (this.userId = params.id));
  }

  ngOnInit() {
    // this.userValue = this.user.getUserData();
    // console.log(this.userId);
    if (!this.userId) {
      this.router.navigate(["users"]);
    } else {
      this.getAllTransactionForUser(this.userId);
      this.getUserDetails(this.userId);
    }
  }

  getAllTransactionForUser = uuid => {
    this.user.getAllTransactionsForUser(uuid).subscribe(dataNew => {
      this.userdata = dataNew;
      this.gift_card_transaction = this.userdata.gift_card_transaction;
      this.purchased_transaction = this.userdata.purchased_transaction;
      this.bucks = this.userdata.bucks;
    });
  };

  getUserDetails = uuid => {
    this.user.getSingleUser(uuid).subscribe(data => {
      this.userValue = data;
      this.userDetails = this.userValue.user;
    });
  };
  goBack = () => {
    this.location.back();
    // this.router.navigate
  };
}
