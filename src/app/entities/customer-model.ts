export class CustomerModel {
  id: number;
  phone: string;
  name: string;
  emailAddress: string;
  merchantId: number;
  country: string;
  customerMobile:any;
  firstName:string;
  idNumber:string;
  mobileNumber:string;
  surname:string;
  occupation:string;
  file:File;
  file1:File;
  kraPin:string;
  signature:Signature;
  customerPhoto: {
    id: string;
  };
  employeeNumber:string;
  nationalId:idDocument;


}
export class Photo{
  id: string;
}
export class Signature {
  id: string;
}
export class idDocument {
  id: string;
}
