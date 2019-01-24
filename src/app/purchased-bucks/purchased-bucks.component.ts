import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-purchased-bucks",
  templateUrl: "./purchased-bucks.component.html",
  styleUrls: ["./purchased-bucks.component.scss"]
})
export class PurchasedBucksComponent implements OnInit {
  constructor(private trans: TransactionsService, private router: Router) {}

  purchasedBuck;
  showsuccessMessage;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  loading: boolean = true;
  ngOnInit() {
    this.loading = true;
    this.getPrchasedBucks();
  }

  getPrchasedBucks = () => {
    this.trans.getPurchasedBucks().subscribe(data => {
      console.log(data);
      this.purchasedBuck = data;
      this.loading = false;
    });
  };
  gotoUserDetails = id => {
    this.router.navigate(["posts/" + id]);
  };
}
