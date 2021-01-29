import { StandardEntity } from "./base/sys$StandardEntity";
import { Status, Gender, IprsStatus } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { CustomerDetails } from "./fortis_CustomerDetails";
export class CustomerKYC extends StandardEntity {
  static NAME = "fortis_CustomerKYC";
  firstName?: string | null;
  actionStatus?: Status | null;
  title?: string | null;
  otherName?: string | null;
  surName?: string | null;
  serialNumber?: string | null;
  birthdate?: any | null;
  signature?: FileDescriptor | null;
  fingerPrint?: FileDescriptor | null;
  image?: FileDescriptor | null;
  gender?: Gender | null;
  idNumber?: string | null;
  iprsStatus?: IprsStatus | null;
  customer?: CustomerDetails | null;
}
export type CustomerKYCViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerKYC-view";
export type CustomerKYCView<V extends CustomerKYCViewName> = V extends "_base"
  ? Pick<
      CustomerKYC,
      | "id"
      | "firstName"
      | "actionStatus"
      | "title"
      | "otherName"
      | "surName"
      | "serialNumber"
      | "birthdate"
      | "gender"
      | "idNumber"
      | "iprsStatus"
    >
  : V extends "_local"
  ? Pick<
      CustomerKYC,
      | "id"
      | "firstName"
      | "actionStatus"
      | "title"
      | "otherName"
      | "surName"
      | "serialNumber"
      | "birthdate"
      | "gender"
      | "idNumber"
      | "iprsStatus"
    >
  : V extends "_minimal"
  ? Pick<CustomerKYC, "id" | "firstName">
  : V extends "customerKYC-view"
  ? Pick<
      CustomerKYC,
      | "id"
      | "firstName"
      | "actionStatus"
      | "title"
      | "otherName"
      | "surName"
      | "serialNumber"
      | "birthdate"
      | "gender"
      | "idNumber"
      | "iprsStatus"
      | "signature"
      | "fingerPrint"
      | "image"
    >
  : never;
