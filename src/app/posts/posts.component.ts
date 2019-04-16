import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  userValue;
  gift_card_transaction;
  purchased_transaction;
  userdata;
  bucks;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  itemsPerPage_gift: number = 10;
  currentPage_gift: number = 1;
  itemsPerPage_bucks: number = 10;
  currentPage_bucks: number = 1;
  currentPage_Purchasedbucks: number = 1;
  currentPage_giftSpent: number = 1;
  userId: number;
  userDetails: Object;
  purchasedGiftCard;

  achTransfer;
  bucksTransfer;
  userType;
  purchasedBucks;
  spentGiftCards;
  userFirstName;
  constructor(
    private data: DataService,
    private user: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => (this.userId = params.id));
  }

  ngOnInit() {
    let uuid = this.userId;
    if (!uuid) {
      this.router.navigate(["users"]);
    } else {
      // this.getAllTransactionForUser(uuid);
      this.getUserDetails(uuid);

      this.getBucksTransferDetails(uuid);

      this.getGiftCardPurchaseDetails(uuid);

      this.getMerchantACHTransferDetails(uuid);

      this.getUserPurchasedBucks(uuid);

      this.getSpentGiftCards(uuid);
    }
  }

  getAllTransactionForUser = uuid => {
    this.user.getAllTransactionsForUser(uuid).subscribe(dataNew => {
      this.userdata = dataNew;
      this.gift_card_transaction = this.userdata.gift_card_transaction;
      this.purchased_transaction = this.userdata.purchased_transaction;
      this.bucks = this.userdata.bucks;

      // this.getBucksTransferDetails(uuid);

      // this.getGiftCardPurchaseDetails(uuid);

      // this.getMerchantACHTransferDetails(uuid);

      // this.getUserPurchasedBucks(uuid);
    });
  };

  getBucksTransferDetails = uuid => {
    this.user.getBucksTransferDetails(uuid).subscribe(bucks => {
      console.log(bucks);
      this.bucksTransfer = bucks;
      this.bucksTransfer = this.bucksTransfer.length
        ? this.bucksTransfer
        : false;
    });
  };

  getGiftCardPurchaseDetails = uuid => {
    this.user.getGiftCardPurchaseDetails(uuid).subscribe(giftCards => {
      this.purchasedGiftCard = giftCards;
      this.purchasedGiftCard = this.purchasedGiftCard.length
        ? this.purchasedGiftCard
        : false;
    });
  };
  getUserDetails = uuid => {
    this.user.getSingleUser(uuid).subscribe(data => {
      this.userValue = data;
      this.userDetails = this.userValue.user;
      this.userFirstName = this.userValue.user.firstName;
      this.userType = this.userValue.user.isMerchant
        ? "Merchant"
        : this.userValue.user.isAdmin
        ? "Admin"
        : "User";
    });
  };

  getMerchantACHTransferDetails = uuid => {
    this.user.getMerchantACHTransferDetails(uuid).subscribe(achTransfer => {
      this.achTransfer = achTransfer;
      this.achTransfer = this.achTransfer.length ? this.achTransfer : false;
    });
  };

  getUserPurchasedBucks = uuid => {
    this.user.getUserPurchasedBucks(uuid).subscribe(purchasedBucks => {
      // console.log(purchasedBucks);
      this.purchasedBucks = purchasedBucks;
      this.purchasedBucks = this.purchasedBucks.length
        ? this.purchasedBucks
        : false;
    });
  };
  getSpentGiftCards = uuid => {
    this.user.getSpentGiftCards(uuid).subscribe(giftCards => {
      this.spentGiftCards = giftCards;
      this.spentGiftCards = this.spentGiftCards.length
        ? this.spentGiftCards
        : false;
    });
  };
  goBack = () => {
    this.location.back();
    // this.router.navigate
  };
}
