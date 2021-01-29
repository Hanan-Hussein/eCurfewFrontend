import { BaseUuidEntity } from "./base/sys$BaseUuidEntity";
import { Status } from "../enums/enums";
export class NewEntity extends BaseUuidEntity {
  static NAME = "fortis_NewEntity";
  createTs?: any | null;
  actionStatus?: Status | null;
  createdBy?: string | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
  version?: number | null;
}
export type NewEntityViewName = "_base" | "_local" | "_minimal";
export type NewEntityView<V extends NewEntityViewName> = V extends "_base"
  ? Pick<NewEntity, "id" | "actionStatus">
  : V extends "_local"
  ? Pick<NewEntity, "id" | "actionStatus">
  : never;
