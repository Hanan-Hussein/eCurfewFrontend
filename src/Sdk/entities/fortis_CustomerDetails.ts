import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { NextOfKin } from "./fortis_NextOfKin";
import { CustomerStatus } from "./fortis_CustomerStatus";
import { Sector } from "./fortis_Sector";
import { Industry } from "./fortis_Industry";
import { AccountOfficer } from "./fortis_AccountOfficer";
export class CustomerDetails extends StandardEntity {
  static NAME = "fortis_CustomerDetails";
  idNumber?: string | null;
  signature?: FileDescriptor | null;
  fingerPrint?: FileDescriptor | null;
  surname?: string | null;
  otherNames?: string | null;
  title?: string | null;
  dateOfBirth?: any | null;
  idDocument?: string | null;
  kraPin?: string | null;
  employeeNumber?: string | null;
  mobileNumber?: string | null;
  occupation?: string | null;
  currentAddress?: string | null;
  emailAddress?: string | null;
  nextOfKin?: NextOfKin | null;
  customerStatus?: CustomerStatus | null;
  sector?: Sector | null;
  industry?: Industry | null;
  accountOfficer?: AccountOfficer | null;
  firstName?: string | null;
  customerPhoto?: FileDescriptor | null;
  nationalId?: FileDescriptor | null;
}
export type CustomerDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerDetails-view";
export type CustomerDetailsView<
  V extends CustomerDetailsViewName
> = V extends "_base"
  ? Pick<
      CustomerDetails,
      | "id"
      | "firstName"
      | "idNumber"
      | "surname"
      | "otherNames"
      | "title"
      | "dateOfBirth"
      | "idDocument"
      | "kraPin"
      | "employeeNumber"
      | "mobileNumber"
      | "occupation"
      | "currentAddress"
      | "emailAddress"
    >
  : V extends "_local"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "surname"
      | "otherNames"
      | "title"
      | "dateOfBirth"
      | "idDocument"
      | "kraPin"
      | "employeeNumber"
      | "mobileNumber"
      | "occupation"
      | "currentAddress"
      | "emailAddress"
      | "firstName"
    >
  : V extends "_minimal"
  ? Pick<CustomerDetails, "id" | "firstName">
  : V extends "customerDetails-view"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "surname"
      | "otherNames"
      | "title"
      | "dateOfBirth"
      | "idDocument"
      | "kraPin"
      | "employeeNumber"
      | "mobileNumber"
      | "occupation"
      | "currentAddress"
      | "emailAddress"
      | "firstName"
      | "customerPhoto"
      | "nationalId"
    >
  : never;
