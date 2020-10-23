import { User } from "./base/sec$User";
import { Gender } from "../enums/enums";
import { FileDescriptor } from "./base/sys$FileDescriptor";
export class FortisUser extends User {
  static NAME = "fortis_FortisUser";
  nationalId?: string | null;
  gender?: Gender | null;
  profilePhoto?: FileDescriptor | null;
  fingerPrint?: FileDescriptor | null;
  phoneNumber?: string | null;
}
export type FortisUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "fortisUser-view";
export type FortisUserView<V extends FortisUserViewName> = V extends "_base"
  ? Pick<
      FortisUser,
      | "id"
      | "login"
      | "name"
      | "nationalId"
      | "gender"
      | "phoneNumber"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
    >
  : V extends "_local"
  ? Pick<
      FortisUser,
      | "id"
      | "nationalId"
      | "gender"
      | "phoneNumber"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
    >
  : V extends "_minimal"
  ? Pick<FortisUser, "id" | "login" | "name">
  : V extends "fortisUser-view"
  ? Pick<
      FortisUser,
      | "id"
      | "nationalId"
      | "gender"
      | "phoneNumber"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
      | "profilePhoto"
      | "fingerPrint"
    >
  : never;
