
export class CustomerModel {
  phoneNumber(phoneNumber: any) {
    throw new Error('Method not implemented.');
  }
  customerID:string;
  id: number;
  phone: string;
  name: string;
  emailAddress: string;
  merchantId: number;
  country: string;
  customerMobile:any;
  firstName:string;
  idNumber:string;
  nextofkinname:string;
  currentAddress:string;
  nextofkinrelationship:string;
  nextofkinmobileNumber:string;
  nextofkinaddress:string;
  nextofkinoccupation:string;
  mobileNumber:string;
  surname:string;
  occupation:string;
  file:File;
  file1:File;
  base64:string;
  kraPin:string;
  signature:Signature;
  customerPhoto: {
    id: string;
  };
  employeeNumber:string;
  nationalId:idDocument;
  industry:industries;
  customerStatus:Customerstatus;
  accountOfficer:accountofficer;
  sector:Sectors;
  tapAddressCollection: any;
  uploadRequest:uploadRequest;
  fingerPrint:Print;
}
export class Print{
  id:string;
}
export class uploadRequest{
  file:string;
}
export class Sectors{
  id:string;
}
export class Customerstatus{
  id:string;
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
export class industries{
  id:string;
}
export class accountofficer{
  id:string;
}
