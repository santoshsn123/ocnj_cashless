import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  baseUrl: string;
  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }

  userData;
  submitLogin(Object) {
    return this.http.post(this.baseUrl + "/v1/admin/login", Object);
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + "/v1/admin/users");
  }
  saveUser(Object) {
    return this.http.post(this.baseUrl + "/v1/register", Object);
  }

  editUser = (Object, uuid) => {
    return this.http.put(this.baseUrl + "/v1/users/" + uuid, Object);
  };
  deleteUser(uuid) {
    return this.http.delete(this.baseUrl + "/v1/user/" + uuid);
  }
  getSingleUser = uuid => {
    return this.http.get(this.baseUrl + "/v1/admin/user/" + uuid);
  };
  changeUserStatus = (Object, uuid) => {
    return this.http.put(this.baseUrl + "/v1/admin/userStatus/" + uuid, Object);
  };

  getMerchants = () => {
    return this.http.get(this.baseUrl + "/v1/admin/getMerchants/");
  };
  setUserData = data => (this.userData = data);
  getUserData = () => {
    return this.userData;
  };
  getAllTransactionsForUser = uuid => {
    return this.http.get(
      this.baseUrl + "/v1/admin/completeTransactionForUser/" + uuid
    );
  };
  changePassword = Object => {
    return this.http.post(this.baseUrl + "/v1/admin/changePassword/", Object);
  };
}
