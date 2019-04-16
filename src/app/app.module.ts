import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import {
  UsersComponent,
  DialogOverviewExampleDialog
} from "./users/users.component";
import { DetailsComponent } from "./details/details.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatNativeDateModule
} from "@angular/material";
import { GooglePlacesDirective } from "./google-places.directive";

import { NgxPaginationModule } from "ngx-pagination";
import {
  GiftCardComponent,
  createGiftCard
} from "./gift-card/gift-card.component";
import { TransationsComponent } from "./transations/transations.component";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";

import {
  FilterPipe,
  FilterUsers,
  FilterACHTransfer,
  FilterGiftCard,
  FilterBucksPurchased,
  FilterConveniencePaid
} from "./filter.pipe";

import { Angular2CsvModule, Angular2CsvComponent } from "angular2-csv";
import { PurchasedBucksComponent } from "./purchased-bucks/purchased-bucks.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

import { AuthenticationServiceService } from "./services/Autherisation/authentication-service.service";
import {
  ConvenienceFeesComponent,
  createConvenience
} from "./convenience-fees/convenience-fees.component";

import { MatTabsModule } from "@angular/material";
import {
  AchTransferComponent,
  DialogToShowACHDetails
} from "./ach-transfer/ach-transfer.component";
import { ConvenienceFeesPaidComponent } from "./convenience-fees-paid/convenience-fees-paid.component";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UsersComponent,
    DetailsComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    DialogOverviewExampleDialog,
    DialogToShowACHDetails,
    createGiftCard,
    GooglePlacesDirective,
    GiftCardComponent,
    TransationsComponent,
    FilterPipe,
    FilterUsers,
    FilterGiftCard,
    FilterACHTransfer,
    FilterBucksPurchased,
    FilterConveniencePaid,
    PurchasedBucksComponent,
    ChangePasswordComponent,
    ConvenienceFeesComponent,
    createConvenience,
    AchTransferComponent,
    ConvenienceFeesPaidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    Angular2CsvModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [
    MatDatepickerModule,
    Angular2CsvComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationServiceService,
      multi: true
    },
    FilterPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExampleDialog,
    createGiftCard,
    createConvenience,
    DialogToShowACHDetails
  ],
  exports: [
    DialogOverviewExampleDialog,
    createGiftCard,
    createConvenience,
    DialogToShowACHDetails
  ]
})
export class AppModule {}
