
export class CreatePoliceOfficerWrapper {
    fullName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    position: string;
    serviceNumber: string;
    nationalId: string;
    // file:File;
    email: string;
    workGroups: Array<WG>;
    status: string;
    passwordStatus: string;
    gender: string;
    genderId: string;
    workgroup_id: number[];
    actionStatus: string;
    rank: Rank;
    policeStationAssigned: PoliceStation;


}
export class WG{
  id: string;
}
export class Rank {
    id: string;
  }
  export class PoliceStation {
    id: string;
  }


