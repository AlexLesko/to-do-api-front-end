import { UserAuthModel } from "./user-auth-request";
import { UserModel } from "./user-model";

export class UserRegisterModel {
    users : UserModel = new UserModel;
    userRequest : UserAuthModel = new UserAuthModel;
}