import { StandardEntity } from "./base/sys$StandardEntity";
import { Status } from "../enums/enums";
export class Sector extends StandardEntity {
  static NAME = "fortis_Sector";
  code?: string | null;
  actionStatus?: Status | null;
  active?: boolean | null;
  description?: string | null;
  changes?: string | null;
}
export type SectorViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "sector-view"
  | "sector1-view";
export type SectorView<V extends SectorViewName> = V extends "_base"
  ? Pick<
      Sector,
      "id" | "description" | "code" | "actionStatus" | "active" | "changes"
    >
  : V extends "_local"
  ? Pick<
      Sector,
      "id" | "code" | "actionStatus" | "active" | "description" | "changes"
    >
  : V extends "_minimal"
  ? Pick<Sector, "id" | "description">
  : V extends "sector-view"
  ? Pick<
      Sector,
      | "id"
      | "code"
      | "actionStatus"
      | "active"
      | "description"
      | "changes"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
    >
  : V extends "sector1-view"
  ? Pick<
      Sector,
      "id" | "code" | "actionStatus" | "active" | "description" | "changes"
    >
  : never;
