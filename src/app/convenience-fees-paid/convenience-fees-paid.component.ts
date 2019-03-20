import { Component, OnInit, Input } from "@angular/core";
import { GiftCardService } from "../services/gift-card/gift-card.service";

@Component({
  selector: "app-convenience-fees-paid",
  templateUrl: "./convenience-fees-paid.component.html",
  styleUrls: ["./convenience-fees-paid.component.scss"]
})
export class ConvenienceFeesPaidComponent implements OnInit {
  constructor(private giftCard: GiftCardService) {}
  conveniences;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  startDate;
  endDate;
  showsuccessMessage: string = "";
  loading: boolean = false;

  @Input() dashboardConvenienceFees: string;
  ngOnInit() {
    this.getAllApidFees();
  }
  getAllApidFees = () => {
    this.giftCard.getConvenienceFeesPaid().subscribe(data => {
      this.conveniences = data;
    });
  };
}
