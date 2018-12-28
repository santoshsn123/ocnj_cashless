import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";

@Injectable({
  providedIn: "root"
})
export class GiftCardService {
  baseUrl: string;
  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }

  getAllCards = () => {
    return this.http.get(this.baseUrl + "/v1/card");
  };

  deleteCard = uuid => {
    return this.http.delete(this.baseUrl + "/v1/card/" + uuid);
  };
  createGiftCards = Object => {
    return this.http.post(this.baseUrl + "/v1/card/", Object);
  };
}
