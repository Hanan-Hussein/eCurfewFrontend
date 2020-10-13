import {RoleMaps} from '../role-maps-model';

export class CreateUserWrapper {
    userId: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    // userType: string;
    userTypeId: number;
    documentType: string;
    documentNumber: string;
    status: string;
    roleMaps: Array<RoleMaps>;
    passwordStatus: string;
    genderId: number;
    gender: {gender: string};
    workgroupIds: number[];
    groupId:  number[];
    tenantIds: number;
    actionStatus: string;
    userType: {userType: string};
}


