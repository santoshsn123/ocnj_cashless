import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TransactionsService {
  baseUrl: string = "http://localhost:3000/api";
  constructor(private http: HttpClient) {}

  getAllTransactions = () => {
    return this.http.get(this.baseUrl + "/v1/admin/transactions");
  };
  getPurchasedBucks = () => {
    return this.http.get(this.baseUrl + "/v1/admin/pruchasedBucks");
  };
}
