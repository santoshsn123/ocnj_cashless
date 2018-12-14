import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  posts$: Object;
  userValue;
  gift_card_transaction;
  purchased_transaction;
  userdata;
  bucks;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  itemsPerPage_gift: number = 10;
  currentPage_gift: number = 1;
  constructor(
    private data: DataService,
    private user: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.data.getPosts().subscribe(data => (this.posts$ = data));
    // console.log(this.posts$);
    this.userValue = this.user.getUserData();
    console.log(this.userValue);
    if (!this.userValue) {
      this.router.navigate(["users"]);
    }
    this.getAllTransactionForUser(this.userValue.uuid);
  }

  getAllTransactionForUser = uuid => {
    this.user.getAllTransactionsForUser(uuid).subscribe(dataNew => {
      this.userdata = dataNew;
      console.log(this.userdata);
      this.gift_card_transaction = this.userdata.gift_card_transaction;
      this.purchased_transaction = this.userdata.purchased_transaction;
      this.bucks = this.userdata.bucks;
    });
  };
}
