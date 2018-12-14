import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  baseUrl: string = "http://localhost:3000/api";
  constructor(private http: HttpClient) {}

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
}
