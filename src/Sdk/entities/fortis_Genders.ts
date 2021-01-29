import { StandardEntity } from "./base/sys$StandardEntity";
export class Genders extends StandardEntity {
  static NAME = "fortis_Genders";
  name?: string | null;
}
export type GendersViewName = "_base" | "_local" | "_minimal" | "genders-view";
export type GendersView<V extends GendersViewName> = V extends "_base"
  ? Pick<Genders, "id" | "name">
  : V extends "_local"
  ? Pick<Genders, "id" | "name">
  : V extends "_minimal"
  ? Pick<Genders, "id" | "name">
  : V extends "genders-view"
  ? Pick<Genders, "id" | "name">
  : never;
