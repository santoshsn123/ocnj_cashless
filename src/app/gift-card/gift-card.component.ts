import { Component, OnInit } from "@angular/core";

import { GiftCardService } from "../services/gift-card/gift-card.service";

@Component({
  selector: "app-gift-card",
  templateUrl: "./gift-card.component.html",
  styleUrls: ["./gift-card.component.scss"]
})
export class GiftCardComponent implements OnInit {
  showsuccessMessage: string = "";
  giftCards;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  constructor(private gift: GiftCardService) {}

  ngOnInit() {
    this.getAllCards();
  }

  getAllCards = () => {
    this.gift.getAllCards().subscribe(data => {
      this.giftCards = data;
    });
  };

  deleteCard = card => {
    if (confirm("Do you really want to delete this card?")) {
      this.gift.deleteCard(card.uuid).subscribe(status => {
        this.getAllCards();
        this.showSuccessMessage("Card deleted successfully");
      });
    }
  };

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  closeMessage() {
    this.showsuccessMessage = "";
  }
}
