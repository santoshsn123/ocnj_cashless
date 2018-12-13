import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";

@Component({
  selector: "app-purchased-bucks",
  templateUrl: "./purchased-bucks.component.html",
  styleUrls: ["./purchased-bucks.component.scss"]
})
export class PurchasedBucksComponent implements OnInit {
  constructor(private trans: TransactionsService) {}

  purchasedBuck;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  ngOnInit() {
    this.getPrchasedBucks();
  }

  getPrchasedBucks = () => {
    this.trans.getPurchasedBucks().subscribe(data => {
      console.log("Data : - ", data);
      this.purchasedBuck = data;
    });
  };
}
