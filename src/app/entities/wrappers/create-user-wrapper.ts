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

}


export class Profile {
  id: string;
}
