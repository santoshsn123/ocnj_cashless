import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users/users.component";
import { DetailsComponent } from "./details/details.component";
import { PostsComponent } from "./posts/posts.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GiftCardComponent } from "./gift-card/gift-card.component";
import { TransationsComponent } from "./transations/transations.component";
import { PurchasedBucksComponent } from "./purchased-bucks/purchased-bucks.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ConvenienceFeesComponent } from "./convenience-fees/convenience-fees.component";
import { AchTransferComponent } from "./ach-transfer/ach-transfer.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "details/:id",
    component: DetailsComponent
  },
  {
    path: "posts/:id",
    component: PostsComponent
  },
  {
    path: "giftCard",
    component: GiftCardComponent
  },
  {
    path: "transactions",
    component: TransationsComponent
  },
  {
    path: "purchasedCredit",
    component: PurchasedBucksComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "changePassword",
    component: ChangePasswordComponent
  },
  {
    path: "convenienceFees",
    component: ConvenienceFeesComponent
  },
  {
    path: "achTransfer",
    component: AchTransferComponent
  },
  { path: "**", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
