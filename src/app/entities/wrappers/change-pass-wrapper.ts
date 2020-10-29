export class ChangepassWrapper {
    // currentPassword: string
    // username: string;
    // newPassword: string;
    changePasswordWrapper:PasswordWrapper;
    // changePasswordWrapper: {
    //   oldPass: string;
    //   newPassword: string;
    // };
constructor(){
  this.changePasswordWrapper = new PasswordWrapper();
}


}
export class PasswordWrapper{
  email: string;
  oldPass: string;
  newPassword: string;
}
