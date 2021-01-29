import { StandardEntity } from "./base/sys$StandardEntity";
import { Status } from "../enums/enums";
export class AccountOfficer extends StandardEntity {
  static NAME = "fortis_AccountOfficer";
  code?: string | null;
  actionStatus?: Status | null;
  active?: boolean | null;
  description?: string | null;
  changes?: string | null;
}
export type AccountOfficerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "accountOfficer-view";
export type AccountOfficerView<
  V extends AccountOfficerViewName
> = V extends "_base"
  ? Pick<
      AccountOfficer,
      "id" | "description" | "code" | "actionStatus" | "active" | "changes"
    >
  : V extends "_local"
  ? Pick<
      AccountOfficer,
      "id" | "code" | "actionStatus" | "active" | "description" | "changes"
    >
  : V extends "_minimal"
  ? Pick<AccountOfficer, "id" | "description">
  : V extends "accountOfficer-view"
  ? Pick<
      AccountOfficer,
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
  : never;
