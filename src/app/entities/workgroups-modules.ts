
export class Workgroups {
    groupId: number;
    groupName: string;
    description: string;
    workgroupRolesIds: number[];
    workgroupRoles: Array<workgroupRoles>;
    workGroups:Array<WG>
    createdOn: Date;
    action: string;
    actionStatus: string;
    intrash: string;
    checked: boolean;
    groupAdmin: string;
    phoneNumber: string;
    name:string;
    // workgroupRoles:string[];
    email: string;

}

export class workgroupRoles {
  role: string;
}
export class WG{
  id:string;
}


