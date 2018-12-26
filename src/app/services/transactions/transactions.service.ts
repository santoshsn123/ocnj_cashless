import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";

@Injectable({
  providedIn: "root"
})
export class TransactionsService {
  baseUrl: string;
  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }

  getAllTransactions = () => {
    return this.http.get(this.baseUrl + "/v1/admin/transactions");
  };
  getPurchasedBucks = () => {
    return this.http.get(this.baseUrl + "/v1/admin/pruchasedBucks");
  };
}
