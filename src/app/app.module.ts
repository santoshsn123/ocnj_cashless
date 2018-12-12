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

import { HttpClientModule } from "@angular/common/http";
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
// import { LocalStorage } from '@ngx-pwa/local-storage';

import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { GooglePlacesDirective } from "./google-places.directive";

import { NgxPaginationModule } from "ngx-pagination";
import { GiftCardComponent } from "./gift-card/gift-card.component";
import { TransationsComponent } from './transations/transations.component';

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
    GooglePlacesDirective,
    GiftCardComponent,
    TransationsComponent
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
    NgxPaginationModule

    // LocalStorage,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog],
  exports: [DialogOverviewExampleDialog]
})
export class AppModule {}
