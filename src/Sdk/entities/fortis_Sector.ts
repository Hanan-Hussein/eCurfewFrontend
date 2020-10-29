import { StandardEntity } from "./base/sys$StandardEntity";
export class Sector extends StandardEntity {
  static NAME = "fortis_Sector";
  code?: string | null;
  description?: string | null;
}
export type SectorViewName = "_base" | "_local" | "_minimal";
export type SectorView<V extends SectorViewName> = V extends "_base"
  ? Pick<Sector, "id" | "description" | "code">
  : V extends "_local"
  ? Pick<Sector, "id" | "code" | "description">
  : V extends "_minimal"
  ? Pick<Sector, "id" | "description">
  : never;
