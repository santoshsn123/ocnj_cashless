import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GiftCardService {
  baseUrl: string = "http://localhost:3000/api";
  constructor(private http: HttpClient) {}

  getAllCards = () => {
    return this.http.get(this.baseUrl + "/v1/card");
  };

  deleteCard = uuid => {
    return this.http.delete(this.baseUrl + "/v1/card/" + uuid);
  };
}
