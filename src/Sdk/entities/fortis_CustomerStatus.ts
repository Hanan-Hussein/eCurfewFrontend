import { StandardEntity } from "./base/sys$StandardEntity";
import { Status } from "../enums/enums";
export class CustomerStatus extends StandardEntity {
  static NAME = "fortis_CustomerStatus";
  code?: string | null;
  active?: boolean | null;
  description?: string | null;
  actionStatus?: Status | null;
  notes?: string | null;
  changes?: string | null;
}
export type CustomerStatusViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerStatus-view";
export type CustomerStatusView<
  V extends CustomerStatusViewName
> = V extends "_base"
  ? Pick<
      CustomerStatus,
      | "id"
      | "description"
      | "code"
      | "active"
      | "actionStatus"
      | "notes"
      | "changes"
    >
  : V extends "_local"
  ? Pick<
      CustomerStatus,
      | "id"
      | "code"
      | "active"
      | "description"
      | "actionStatus"
      | "notes"
      | "changes"
    >
  : V extends "_minimal"
  ? Pick<CustomerStatus, "id" | "description">
  : V extends "customerStatus-view"
  ? Pick<
      CustomerStatus,
      | "id"
      | "code"
      | "active"
      | "description"
      | "actionStatus"
      | "notes"
      | "changes"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
    >
  : never;
