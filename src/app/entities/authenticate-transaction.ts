import { NgClass } from '@angular/common';

export class AuthenticateModel{
  description:string;
  name: string;
  code: string;
  id: number;
  authenticateTransaction:Authenticate;

}
export class Authenticate{
  idNumber:string;
  fingerPrint:string;
  transactionId:string;
}
