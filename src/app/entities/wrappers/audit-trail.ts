import {Users} from "../users-model";

export class AuditTrail {
  type:string;
  changes:string;
  user:Users
  fullName: string;
    logId: number;
    eventTs: Date;
    id: Users;
    activityType: string;
    status: string;
    entityName: string;
    entityId: string;
    description: string;
    notes: string;
    source: string;
    ipAddress: string;
    userName: string;
    entity:string;


}
