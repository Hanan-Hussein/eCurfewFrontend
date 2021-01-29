import { StandardEntity } from "./base/sys$StandardEntity";
import { Fingers } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { FortisUser } from "./fortis_FortisUser";
import { CustomerDetails } from "./fortis_CustomerDetails";
export class Fingerprints extends StandardEntity {
  static NAME = "fortis_Fingerprints";
  fingerType?: Fingers | null;
  fingerTemplate?: string | null;
  file?: FileDescriptor | null;
  fortisUser?: FortisUser | null;
  customerDetails?: CustomerDetails | null;
}
export type FingerprintsViewName = "_base" | "_local" | "_minimal";
export type FingerprintsView<V extends FingerprintsViewName> = V extends "_base"
  ? Pick<Fingerprints, "id" | "fingerType" | "fingerTemplate">
  : V extends "_local"
  ? Pick<Fingerprints, "id" | "fingerType" | "fingerTemplate">
  : never;
