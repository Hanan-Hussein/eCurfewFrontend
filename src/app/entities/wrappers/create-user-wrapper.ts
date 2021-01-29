import {RoleMaps} from '../role-maps-model';

export class CreateUserWrapper {
    userId: number;
    fullName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    position:string;
    nationalId:string;
    file:File;
    email: string;
    // userType: string;
    userTypeId: number;
    documentType: string;
    workGroups:Array<WG>
    documentNumber: string;
    status: string;
    roleMaps: Array<RoleMaps>;
    passwordStatus: string;
    gender: string;
    genderId:string;
    workgroup_id: number[];
    groupId:  number[];
    tenantIds: number;
    actionStatus: string;
    profilePhoto: Profile;
    userType: {userType: string};
    uploadRequest:uploadRequest;
   // fingerPrint:Print;
    rightThumb:string;
    rightIndex:string;
    rightMid:string;
    rightRing:string;
    rightPinky:string;
    leftThumb:string;
    leftIndex:string;
    leftMid:string;
    leftRing:string;
    leftPinky:string;
    fingerPrints:any [] = [];

}
export class Prints{
  fingerType:string;
  file:Print
}
export class Print{
  id:string;
}
export class uploadRequest{
  file:string;
}
export class Profile {
  id: string;
}
export class WG{
  id:string;
}



