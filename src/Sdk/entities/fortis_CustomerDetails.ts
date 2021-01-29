import { StandardEntity } from "./base/sys$StandardEntity";
import { Fingerprints } from "./fortis_Fingerprints";
import { Status } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { CustomerStatus } from "./fortis_CustomerStatus";
import { Sector } from "./fortis_Sector";
import { Industry } from "./fortis_Industry";
import { AccountOfficer } from "./fortis_AccountOfficer";
export class CustomerDetails extends StandardEntity {
  static NAME = "fortis_CustomerDetails";
  idNumber?: string | null;
  fingerPrints?: Fingerprints[] | null;
  approvedBy?: string | null;
  active?: boolean | null;
  gender?: string | null;
  nextofkinaddress?: string | null;
  nextofkinoccupation?: string | null;
  nextofkinmobileNumber?: string | null;
  nextofkinname?: string | null;
  nextofkinrelationship?: string | null;
  declineNotes?: string | null;
  deleteNotes?: string | null;
  intrash?: string | null;
  actionStatus?: Status | null;
  notes?: string | null;
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
  customerStatus?: CustomerStatus | null;
  sector?: Sector | null;
  industry?: Industry | null;
  accountOfficer?: AccountOfficer | null;
  firstName?: string | null;
  fileTemplate?: string | null;
  customerPhoto?: FileDescriptor | null;
  nationalId?: FileDescriptor | null;
}
export type CustomerDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerDetails-view"
  | "customerReport"
  | "fingerprintView"
  | "frontend";
export type CustomerDetailsView<
  V extends CustomerDetailsViewName
> = V extends "_base"
  ? Pick<
      CustomerDetails,
      | "id"
      | "firstName"
      | "idNumber"
      | "approvedBy"
      | "active"
      | "gender"
      | "nextofkinaddress"
      | "nextofkinoccupation"
      | "nextofkinmobileNumber"
      | "nextofkinname"
      | "nextofkinrelationship"
      | "declineNotes"
      | "deleteNotes"
      | "intrash"
      | "actionStatus"
      | "notes"
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
      | "fileTemplate"
    >
  : V extends "_local"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "approvedBy"
      | "active"
      | "gender"
      | "nextofkinaddress"
      | "nextofkinoccupation"
      | "nextofkinmobileNumber"
      | "nextofkinname"
      | "nextofkinrelationship"
      | "declineNotes"
      | "deleteNotes"
      | "intrash"
      | "actionStatus"
      | "notes"
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
      | "fileTemplate"
    >
  : V extends "_minimal"
  ? Pick<CustomerDetails, "id" | "firstName">
  : V extends "customerDetails-view"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "approvedBy"
      | "active"
      | "gender"
      | "nextofkinaddress"
      | "nextofkinoccupation"
      | "nextofkinmobileNumber"
      | "nextofkinname"
      | "nextofkinrelationship"
      | "declineNotes"
      | "deleteNotes"
      | "intrash"
      | "actionStatus"
      | "notes"
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
      | "fileTemplate"
      | "customerPhoto"
      | "nationalId"
      | "industry"
      | "sector"
      | "customerStatus"
      | "accountOfficer"
      | "signature"
      | "createTs"
      | "createdBy"
    >
  : V extends "customerReport"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "approvedBy"
      | "active"
      | "gender"
      | "nextofkinaddress"
      | "nextofkinoccupation"
      | "nextofkinmobileNumber"
      | "nextofkinname"
      | "nextofkinrelationship"
      | "declineNotes"
      | "deleteNotes"
      | "intrash"
      | "actionStatus"
      | "notes"
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
      | "fileTemplate"
      | "signature"
      | "fingerPrint"
      | "customerStatus"
      | "sector"
      | "industry"
      | "accountOfficer"
      | "customerPhoto"
      | "createTs"
      | "createdBy"
    >
  : V extends "fingerprintView"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "approvedBy"
      | "active"
      | "gender"
      | "nextofkinaddress"
      | "nextofkinoccupation"
      | "nextofkinmobileNumber"
      | "nextofkinname"
      | "nextofkinrelationship"
      | "declineNotes"
      | "deleteNotes"
      | "intrash"
      | "actionStatus"
      | "notes"
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
      | "fileTemplate"
      | "fingerPrint"
    >
  : V extends "frontend"
  ? Pick<
      CustomerDetails,
      | "id"
      | "idNumber"
      | "approvedBy"
      | "active"
      | "gender"
      | "nextofkinaddress"
      | "nextofkinoccupation"
      | "nextofkinmobileNumber"
      | "nextofkinname"
      | "nextofkinrelationship"
      | "declineNotes"
      | "deleteNotes"
      | "intrash"
      | "actionStatus"
      | "notes"
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
      | "fileTemplate"
      | "customerStatus"
      | "sector"
      | "industry"
      | "accountOfficer"
      | "fingerPrint"
    >
  : never;
