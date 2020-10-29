import { StandardEntity } from "./base/sys$StandardEntity";
export class NextOfKin extends StandardEntity {
  static NAME = "fortis_NextOfKin";
  name?: string | null;
  relationship?: string | null;
  mobileNumber?: string | null;
  address?: string | null;
  occupation?: string | null;
}
export type NextOfKinViewName = "_base" | "_local" | "_minimal";
export type NextOfKinView<V extends NextOfKinViewName> = V extends "_base"
  ? Pick<
      NextOfKin,
      "id" | "name" | "relationship" | "mobileNumber" | "address" | "occupation"
    >
  : V extends "_local"
  ? Pick<
      NextOfKin,
      "id" | "name" | "relationship" | "mobileNumber" | "address" | "occupation"
    >
  : V extends "_minimal"
  ? Pick<NextOfKin, "id" | "name">
  : never;
