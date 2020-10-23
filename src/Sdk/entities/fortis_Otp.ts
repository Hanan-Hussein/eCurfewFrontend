import { StandardEntity } from "./base/sys$StandardEntity";
import { FortisUser } from "./fortis_FortisUser";
export class Otp extends StandardEntity {
  static NAME = "fortis_Otp";
  otp?: string | null;
  user?: FortisUser | null;
  redeemed?: boolean | null;
  expiryDate?: any | null;
  otpAttempts?: number | null;
}
export type OtpViewName = "_base" | "_local" | "_minimal" | "otp-view";
export type OtpView<V extends OtpViewName> = V extends "_base"
  ? Pick<Otp, "id" | "otp" | "redeemed" | "expiryDate" | "otpAttempts">
  : V extends "_local"
  ? Pick<Otp, "id" | "otp" | "redeemed" | "expiryDate" | "otpAttempts">
  : V extends "otp-view"
  ? Pick<Otp, "id" | "otp" | "redeemed" | "expiryDate" | "otpAttempts" | "user">
  : never;
