import { StandardEntity } from "./base/sys$StandardEntity";
import { CustomerDetails } from "./fortis_CustomerDetails";
import { CustomerAuthenticationStatus } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class CustomerAuthentication extends StandardEntity {
  static NAME = "fortis_CustomerAuthentication";
  customer?: CustomerDetails | null;
  authenticatedBy?: string | null;
  transactionId?: string | null;
  result?: CustomerAuthenticationStatus | null;
  fingerPrint?: FileDescriptor | null;
  score?: any | null;
}
export type CustomerAuthenticationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "customerAuthentication-view";
export type CustomerAuthenticationView<
  V extends CustomerAuthenticationViewName
> = V extends "_base"
  ? Pick<
      CustomerAuthentication,
      "id" | "authenticatedBy" | "transactionId" | "result" | "score"
    >
  : V extends "_local"
  ? Pick<
      CustomerAuthentication,
      "id" | "authenticatedBy" | "transactionId" | "result" | "score"
    >
  : V extends "customerAuthentication-view"
  ? Pick<
      CustomerAuthentication,
      | "id"
      | "customer"
      | "createdBy"
      | "createTs"
      | "transactionId"
      | "result"
      | "score"
    >
  : never;
