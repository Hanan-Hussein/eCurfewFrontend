import { StandardEntity } from "./base/sys$StandardEntity";
export class AccountOfficer extends StandardEntity {
  static NAME = "fortis_AccountOfficer";
  code?: string | null;
  description?: string | null;
}
export type AccountOfficerViewName = "_base" | "_local" | "_minimal";
export type AccountOfficerView<
  V extends AccountOfficerViewName
> = V extends "_base"
  ? Pick<AccountOfficer, "id" | "description" | "code">
  : V extends "_local"
  ? Pick<AccountOfficer, "id" | "code" | "description">
  : V extends "_minimal"
  ? Pick<AccountOfficer, "id" | "description">
  : never;
