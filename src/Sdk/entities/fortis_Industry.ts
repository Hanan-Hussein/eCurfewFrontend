import { StandardEntity } from "./base/sys$StandardEntity";
import { Status } from "../enums/enums";
export class Industry extends StandardEntity {
  static NAME = "fortis_Industry";
  code?: string | null;
  actionStatus?: Status | null;
  active?: boolean | null;
  description?: string | null;
  changes?: string | null;
}
export type IndustryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "industry-view";
export type IndustryView<V extends IndustryViewName> = V extends "_base"
  ? Pick<
      Industry,
      "id" | "description" | "code" | "actionStatus" | "active" | "changes"
    >
  : V extends "_local"
  ? Pick<
      Industry,
      "id" | "code" | "actionStatus" | "active" | "description" | "changes"
    >
  : V extends "_minimal"
  ? Pick<Industry, "id" | "description">
  : V extends "industry-view"
  ? Pick<
      Industry,
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
