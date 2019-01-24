import { Component, OnInit, SimpleChanges } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";
import { UsersService } from "../services/users/users.service";
import { MatAutocompleteModule, NativeDateAdapter } from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Angular2CsvModule } from "angular2-csv";
import { Angular2CsvComponent } from "angular2-csv";
import { DataService } from "../data.service";
import { FilterPipe } from "../filter.pipe";

@Component({
  selector: "app-transations",
  templateUrl: "./transations.component.html",
  styleUrls: ["./transations.component.scss"]
})
export class TransationsComponent implements OnInit {
  constructor(
    private trans: TransactionsService,
    private user: UsersService,
    private dataservice: DataService,
    private download: Angular2CsvComponent,
    private filterpipe: FilterPipe
  ) {}

  transactions;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  getMerchants;
  searchParams;
  merchantName;
  endDate;
  startDate;
  loading: boolean;
  ngOnInit() {
    this.loading = true;
    this.getAllTransactions();
    this.getAllMerchants();
  }
  clickedFunction = () => {};

  getAllTransactions = () => {
    this.trans.getAllTransactions().subscribe(
      data => {
        this.transactions = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.dataservice.checkAuthentication(error);
      }
    );
  };

  getAllMerchants = () => {
    this.user.getMerchants().subscribe(data => {
      this.getMerchants = data;

      this.getMerchants = this.getMerchants.map((item, index) => {
        return item.firstName;
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value))
      );
    });
  };

  myControl = new FormControl();
  // options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.getMerchants.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  filterTransactions = () => {
    // console.log("Working : - ");
    // this.transactions = this.filterpipe.transform(this.transactions, {
    //   searchString: this.merchantName,
    //   startDate: this.startDate,
    //   endDate: this.endDate
    // });
  };
  updateCalcs = ev => {
    console.log(ev);
  };

  downloadTransactions = () => {
    var data = this.filterpipe.transform(this.transactions, {
      searchString: this.merchantName,
      startDate: this.startDate,
      endDate: this.endDate
    });

    this.options;
    this.download.filename = "Transactions";
    this.download.data = data; //this.transactions;
    this.download.options = this.options;
    this.download.generateCsv();

    // console.log(data);
  };

  options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalseparator: ".",
    showLabels: false,
    filename: "Transactions",
    headers: [
      "Amount",
      "CreatedAt",
      "Description",
      "From_firstname",
      "To_firstname",
      "Transaction_id",
      "UpdatedAt"
    ],
    showTitle: true,
    title: "Transactions",
    useBom: false,
    removeNewLines: true,
    keys: [
      "amount",
      "createdAt",
      "description",
      "from_firstname",
      "to_firstname",
      "transaction_id",
      "updatedAt"
    ]
  };

  // openDialog = () => {
  //   // new Angular2CsvModule(this.transactions, "My Report", this.options);
  // };
}
