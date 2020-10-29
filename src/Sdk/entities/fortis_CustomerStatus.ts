import { StandardEntity } from "./base/sys$StandardEntity";
export class CustomerStatus extends StandardEntity {
  static NAME = "fortis_CustomerStatus";
  code?: string | null;
  description?: string | null;
}
export type CustomerStatusViewName = "_base" | "_local" | "_minimal";
export type CustomerStatusView<
  V extends CustomerStatusViewName
> = V extends "_base"
  ? Pick<CustomerStatus, "id" | "description" | "code">
  : V extends "_local"
  ? Pick<CustomerStatus, "id" | "code" | "description">
  : V extends "_minimal"
  ? Pick<CustomerStatus, "id" | "description">
  : never;
