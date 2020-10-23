import { StandardEntity } from "./base/sys$StandardEntity";
export class Industry extends StandardEntity {
  static NAME = "fortis_Industry";
  code?: string | null;
  description?: string | null;
}
export type IndustryViewName = "_base" | "_local" | "_minimal";
export type IndustryView<V extends IndustryViewName> = V extends "_base"
  ? Pick<Industry, "id" | "description" | "code">
  : V extends "_local"
  ? Pick<Industry, "id" | "code" | "description">
  : V extends "_minimal"
  ? Pick<Industry, "id" | "description">
  : never;
