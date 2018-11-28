import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { LocalStorage } from '@ngx-pwa/local-storage';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UsersComponent,
    DetailsComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    ReactiveFormsModule,
    // LocalStorage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
