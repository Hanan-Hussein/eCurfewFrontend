import { StandardEntity } from "./base/sys$StandardEntity";
import { WorkGroups } from "./fortis_WorkGroups";
import { Status } from "../enums/enums";
export class WorkGroupRoles extends StandardEntity {
  static NAME = "fortis_WorkGroupRoles";
  workGroup?: WorkGroups | null;
  actionStatus?: Status | null;
  role?: string | null;
}
export type WorkGroupRolesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "workGroupRoles-view";
export type WorkGroupRolesView<
  V extends WorkGroupRolesViewName
> = V extends "_base"
  ? Pick<WorkGroupRoles, "id" | "actionStatus" | "role">
  : V extends "_local"
  ? Pick<WorkGroupRoles, "id" | "actionStatus" | "role">
  : V extends "workGroupRoles-view"
  ? Pick<WorkGroupRoles, "id" | "actionStatus" | "role" | "workGroup">
  : never;
