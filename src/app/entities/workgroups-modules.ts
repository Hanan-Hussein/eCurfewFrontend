
export class Workgroups {
    groupId: number;
    groupName: string;
    description: string;
    workgroupRolesIds: number[];
    workgroupRoles: Array<workgroupRoles>;
    createdOn: Date;
    action: string;
    actionStatus: string;
    intrash: string;
    checked: boolean;
    groupAdmin: string;
    phoneNumber: string;
    email: string;

}

export class workgroupRoles {
  role: string;
}


