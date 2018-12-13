import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";
import { UsersService } from "../services/users/users.service";
import { MatAutocompleteModule } from "@angular/material";

import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-transations",
  templateUrl: "./transations.component.html",
  styleUrls: ["./transations.component.scss"]
})
export class TransationsComponent implements OnInit {
  constructor(private trans: TransactionsService, private user: UsersService) {}

  transactions;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  getMerchants;
  ngOnInit() {
    console.log("We will call from here ");
    this.getAllTransactions();
    this.getAllMerchants();
  }
  getAllTransactions = () => {
    this.trans.getAllTransactions().subscribe(data => {
      console.log("This is the transactions : - ", data);
      this.transactions = data;
    });
  };
  getAllMerchants = () => {
    this.user.getMerchants().subscribe(data => {
      this.getMerchants = data;

      this.getMerchants = this.getMerchants.map((item, index) => {
        // console.log("item.firstName :- ", item.firstName);
        return item.firstName;
      });
      console.log(this.getMerchants);

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value))
      );
    });
  };

  myControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.getMerchants.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  clickedHere = () => {
    console.log("this is here :- ", this.filteredOptions);
  };
}
