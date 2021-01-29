import { StandardEntity } from "./base/sys$StandardEntity";
import { Status } from "../enums/enums";
import { WorkGroupRoles } from "./fortis_WorkGroupRoles";
import { FortisUser } from "./fortis_FortisUser";
export class WorkGroups extends StandardEntity {
  static NAME = "fortis_WorkGroups";
  name?: string | null;
  active?: boolean | null;
  actionStatus?: Status | null;
  workgroupRoles?: WorkGroupRoles[] | null;
  description?: string | null;
  fortisUsers?: FortisUser | null;
}
export type WorkGroupsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "workGroups-view";
export type WorkGroupsView<V extends WorkGroupsViewName> = V extends "_base"
  ? Pick<WorkGroups, "id" | "description" | "name" | "active" | "actionStatus">
  : V extends "_local"
  ? Pick<WorkGroups, "id" | "name" | "active" | "actionStatus" | "description">
  : V extends "_minimal"
  ? Pick<WorkGroups, "id" | "description">
  : V extends "workGroups-view"
  ? Pick<
      WorkGroups,
      | "id"
      | "name"
      | "active"
      | "actionStatus"
      | "description"
      | "workgroupRoles"
      | "createTs"
      | "createdBy"
      | "fortisUsers"
    >
  : never;
