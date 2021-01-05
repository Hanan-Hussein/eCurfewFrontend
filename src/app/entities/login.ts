export class Login {
  username: string;
  password: string;
}

export class Otp {
  correlationId: string;
  otpCode: string;
}

export class Biometrics {
  username: string;
  fingerPrint: string;
}
