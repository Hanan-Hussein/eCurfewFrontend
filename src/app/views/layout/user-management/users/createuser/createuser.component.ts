import { MatDialog } from '@angular/material/dialog';


import {CreateUserWrapper, Print, Profile} from '../../../../../entities/wrappers/create-user-wrapper';
import {Roles} from '../../../../../entities/roles-modules';
import {StewardService} from '../../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../../shared/class/notify';
import {routerTransition} from '../../../../../router.animations';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Component, ElementRef, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Gender } from '../../../../../../Sdk/enums/enums';
import { DomSanitizer } from '@angular/platform-browser';


// @ts-ignore
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
  animations: [routerTransition()]
})
export class CreateuserComponent implements OnInit, OnDestroy {
  model: CreateUserWrapper;
  systemRoles: Roles[];
  accept:string;
  multiple:false;
  CreateUserWrapper: FormGroup;
  fileControl:FormGroup;
  workgroups: number[] = [];
  public isUpdate = false;
  gender:any =  [];
  isReadOnly = false;
  userType = [];
  @Output() id: string;
  subscription: Subscription;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(public dialog: MatDialog,
    private stewardService: StewardService<any, any>,
    private notify: Notify,
    private fb: FormBuilder,
    private sanitizer:DomSanitizer,
    protected router: Router) {
    this.model = new CreateUserWrapper();
    // this.model.fingerPrint.id = null;

    this.subscription = new Subscription();
  }
  fingerprint:any;
  imageSource;
  scanned=false;

  base64FingerPrint:any;
  hardcodedBase64="/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExMVFRQXGB0aFxcXGB8eHhoeHxgfICAgIBgaHygiGh4lGxsgJTEhJSotOi4uIB8zRDMtNygtLisBCgoKDQ0NFQ8NFSsZFRkrLSs3LSsrKy0tLSsrLTc3NzcrLSsrKy0tNy0tLTc3NystKy0tKys3Ny0rKystLS0tLf/AABEIAQkAvgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABAMFBgIBB//EADsQAAICAQMDAgUDAgUCBgMBAAECAxEEABIhBRMxIkEGFCMyUUJhgRVxJDNSYpE0oQdDRFNywaKx0Rb/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuOjRo0Bo0aNAaNGjQGjRo0Bo15uHj30l1LqsUCCRydhKjcBY9RAB49ubv8aB7RrLdV+OsbGeRZknRY63SGMlPUAVorZNkgVV3pVfi2AydtOoIWFkrJFwAvDWy7dvJH8gj9gGz0aoendcaQSFTj5BVmpcaZWageAQ9AN+edPYHVlkDbkeFk+5ZV20PyG+1l/cHQWGjXKOGAIIIPII8H+ddaA0aNGgNGjRoDRo0aA0aNGgNGjRoDRo0aA0aNV/WOqCBRSPLIxpIoxbMf/wBKo92PA/7aB53oE0TQ8DzpPNypQQsUO8lXNswVVIHpDHk+o/gGhf8AbWP+KuoSSg4zdQhxHIBZMcmTI8sKXaQ3nZyADww8G9Zzq8MXyis+T1hmSRxFDuZZpQSdiuqhmVGZGCu4Bq+ONBrOsdQ6gigiTp+LX391ydq7uSDYH2/keb/jPr8VSCRD/XunMgWnUxAAktwwp/IFcbvzxrOY3TJHFY/w4WUqGkfOkIcts9mlYUA348j2W+OMfAlxSAMTomOyKDG0swdu4PuG53JJAvg+D7mtBocX4lzVZnfqnSZIiSIw8o9X1LF7AoQhf7+399LSRZqxgr/Q5IWDNLZpTI4pmLsxu2JNUB7aRizcpgznO+H/AE1uG1SvPj1bebJPj/71YY/RUdR2sboOWftOwlGdwSSq8MLrb7+58DjUVBgdFlZVjyehxOADeRgzJGTuICnajKQNgF8m6GtHifEUEYjYS9RhjB2KJ4HdXBIHJ2lvTsqyfDHzYOqCfoJi2SL0GeFnYd0YudQChjVCJxvahYBAHPkHnTH9UCM5Gf1bCs8rlY3dVW4APcaNgF492r7jfOg23w91QTDfC+LNEPSWgYqQxJJuM2BwEqzZO7xq+TLUuychlryCAb8UTw3PHHg6+ZqkWVCEkhx82EuXefp7duRTTVI2ODZbx4Lc2aNC7vA6lk7ZZ8SZM/FSMosBBSYSJ5DOVsseRTAeF9+TUbnRrJfDPxGs6QimxJXU7MTIFMVQkEoSAx4HnmhXHvrW6A0aNGgNGjRoDRo0aA0aNGgNGjRoDWP+NMyd45I4EylChe4+Og7rbm29uMvwCN29n/SFPgmxq8qRlQlVLsBwoIBP7WeP+dYDr2RlTyz4+NkF8jtsESF+3DjKSoV5pQCzSj7ggPixtIs6CgyumribO5OnS0aT0rjhps3IpW/zJRfPqsrtYbr58HXGCox8Z58VsvD7rmOfO6gd0saRqHQrC1CQOSUFeoFjQNcc9GjiinkXpUK5OaIduR1GV6gRyCXcEghmLgHgfzQOjofUMbuvhNOeqE3kTZOQwONjyIrbW5v0ljRo1yAL9gz802FMn02y+qTPJtMuSZkx03eoilNg+laU34B9hqw6Z0mNygh6AZ5Y2TuyuHgibk3sjma24/PvyR4GrHpfVyzCH+s2dtLj9LxAVShZptjcfuAP4vUPVOjsAJni69mkngPIIlHleVX1rxwTQBBOg6n6PNGNy9C6WACB654zSFqYtuIF2KDe3IAOjK6S6sZ8jo/T4xGWMbR5vZWmTltq8OaH3HaeP2vVXN0/EjdFfA6Xj7RTfM9QMjWD6gVjJtgx5FH3/PF4vUMUL3UyeiQPQWB0gLFDVD1sQQQAwHFcjj8h1B/S41Qxv1XBWaPuMUM4Xm7BJ3eoc+P2Nni7KPqvckRsPrifaVOPmKhJKkDdxsdeBdsD+f2C8vxFOH3Dr/TSrgelogFTbw2z6nO4+Sx/NUBxYS4HVJSVnj6Vnw2QxNowHFqPSwU8H88nnxqKTl6FNKYmRcGObsttzcScxEEqxDdpVqVDQ4N/q11npkR4xm6lhEyLKm6bAkKOysCC7CNt7gE0Rze4GhRpLO6Fh4U0THomQscTK4yIHMhHpJO5VJZwGoUfIvmuDZQQvFFLJHm5mTj9sMFiK/Mw91w5cxsoNBRwKsDcNp4oiTCzcgmTsyR9UxkYgxsQmXF/qW22hq480SOL1pPhPM3xXG0rozkrFOvbkhTldtMNzAMpAJ/fnitYyTNRtsc2ZjSyGlcdQxTjSFC63slG03t/G6yVNjVzJMsISCaLMjWZpBHkiUP2AfVffU7lQk8br8UeALK32jVN8Kzl4FPzaZYoVKqhS3vbBSRdEeAP++rnVQaNGjQGjRo0Bo0aNAaNGjQUfxi8S45M2S+PFuG8oadxz9NT925/Ho9R8DXzfqmZCsCxyyf0/Cdd0PTsdKysgE+kuw5Quwrb7+C13rX/ABV1kDKWLFxpMvORCVAY9mDdwry2wVSRuqhuI3CxesfjxBZpMn5qDJzwN02dIT8vgIeNkalqLi22rYP5qyCEHxLAlLBlMMeFhcPRsIDuOxJKGRox7kbj7Clrkcx5EIWTHx+oyrDFwsfSMMMS3ICmVkb3Js2ea4PnUkeDFEhkXImiXIO4ZQHczs8FfEC1ugQEjwLI23Q5JKWxYzezpkL3UcQ73Ucjz9z89tnHO7nbfmtB3gfMY1Qyvj9NGwu2L06Pu5Un+neSrgEceq+f29oeo4PdgQyYhhjBtcjqvUJEdxXBaONtwbgiq8VXvVtNljEiOQ80PTIpI4iVVA+dJ6Bw7Sfquxyp8Was6V6TIXByUwJwIwAcvNhfIyGLCqixlIoU17hSjng2dBzl5Pc2iHJLM7LbYXSw6Ae9yy3YBN3uJBI866TNlg2L3+sVL6Y/8BEApAsehkvyeAK8n8HTU2DkM4Lf1nKFBgVdcSMVfp7YKG/3Nfp/lbHxcoFlmwpUiZrQP1dg6bUWzfc9Qsn+faq0EWdllVL5ObjScBo/nOkMCoY2AGQAE8Vxf/fXmVidMkavl+kOZaO8ZbQkq/3MqFODxxR83+Tq/wAVco7mCdSh9vp5OPkpwCLVZCxIG2qAuz4vxBlkzIonmLoCw7fUunHbatwe4iqE+6gTdr7ebijqHTO4sC4s/UHhVL7uHmJIImUemNo7+oP93JPH5OlMbqKZBMfc/qJXeWaJjjZ0KrIAVKWpkUWOLW68HjUuLg4s4Kx4+DKwG8/0vM7UhPmyloKAbyXPJHH4r/iLqC/NxyST52BkMtoXw4pGVFvcO7EC0iULIJarBPF6Cun+JYc1ZMdc/uB9pGN1SEKoKm9vzMTLsf8AB/21etP0/L+UGGVy4sKGRCPkp5BNG48K0MykttJYHk+K4HI1lcPBkmLuVw+uRgd6wwiyRuYqRtHq2ggkIf2r2GusTsSKMTp04nCOpPT+pRA0ftZY5HFoy1RUfub82R9E+G4YoJmhXp74R7hYPEm+KW+D61UiMGwaO3gD/SQNmrA+DevnfSeoF8l4YppcHNKAthTp3IQFCjfHVDbtHGxx4NrwdXXw11SNMiXDbGfFkZmlUHmKYmt7RP4PJ3FaB5Joc6o1ejRo0Bo0aNAaNGjQGl8/MSGN5XJCoCTQJPH4A5J/YaY1Q/FXWJYBGkGLJkzybhEFA2IwXzI5ICLz/PgaDKfEvU5pI+5PN/ScBtxYkhcuVhdBVF7Nyi6FtwRQB1gOndDy3TFhSBFhEsxhGayr3xICwdsUn1Mirdm/I4oa0GY4+ZWWdf6r1VXVBDESIMQ+bAIo15LG+QL2+dUuRlPJLJAuSJp13DN6lK30oI3AV0gsgIBYUULZiaoeAsejZckrNLjSiSdYimV1SRWcIaLGLExxtDEAEgKvI59+UsPOZMoY2Ik4lMbNPkiNZs1jVAPLIxTGRgF4JtaF1epMmSKWOF5JGxOnISuBjQp/isjwC48lSzD/ADByQ7D3s2EzMFGE8HaMrlk6dA9ySKR92Xk87FJBZubI/sdApnZnbljXERlmeBZMrJEfzmUGdq2GT/KQFV82BXFCuXpRNOrCXO6hPJYC4uFIjNHa+nvTxqIg1gsQOBYFt7w4cUmSGRlOWUYhoMdjjdPh5G4PLQM7Agk1u8nTb9SeaIRw93KMZCjG6YHxsZOAKbLoF1C3RU0fNDggFl6IVjHzOIIzGS2/qXVHG43Xc7cVr+L/AIAvzpWCHCjVlf8A/wA73PKHfJIPt4DbrJ/Nk+/jTWSuLjyf5fR8U7DuM8zZkvI8dvijf4Jvn86awc/KZl2zZjIABWJ0pYgR7MJJ7tK9gATxx+YK7GbBiBjZumb5NjhYo8qHgHcW7ikkgCyOB4vjWk6cFd2bGmyCoRq+Xz+9ZCqD9DLXyvHk8WL86gyJ+pJG+wdV9QASSVcJin5PbJBFn2J8e4I1xlTzsrJOM6VCpBOV06KWNSSvk453MPFlLur9tFJfEldsyTRrkNECu3J6XKsjNRsCfHpFWyKIB9zZOkOn5MayiOCOcdtWkg+Uyy5CEEODi5YDEgKpKV+B+dWEmS2LkHuvDHKwQqTPl46kFVNRPMWiYgcbW27SWHFnUPxBiSSSxGWSQvuVIVzVSMvvLcQ5+ICoY1YDePT55BCmES5UHcxXjmylbaGxl+TyVXd7wKdswNE8EePP4eSIZaTLmY75mxtvzUGP2s2EhQ47sBAIHJord0fOuWwk+alLJJk5CQ08MhCZkAq90Uq0uWy3w+7dS8Xu5gwfiFpCSzZkqRkL8zGNuXjOQN6sikmXHU1e8eTXJ0F50KaZcVS6t1XCIdA6ArlYxtgwazvsIxB2mxXHBvVz03rM2OiZOPN/UOlqNvpS8mJh6aUKB3BuPggEA/gWc30wNNG2VbSG2rqPT+JNyEsDk4oChiUYcUxosD93F98DZHzEKT42UnzhYPlxoqoJlSR1t4SD25GH6127qF8eA+nI1gGiP2OvdLYGWJVvayMDTIwoqa5H4PnyLB9idM6qDRo0aA0aNGgNYX4zzZ5VkDZBwMFBb5A/zZqDF441PqSgt7qJb2sXrV9c6omLA87gsFApVFs7E0qKPdmYhQPydfKusZDyZUb5kRysw08HT1NRYiE0ZJ5PDNtFm+L48EEBViOE4bfLBundNkFy5EhvKzdoYuiLZJBF8+LviiRpXM6hGqY8Lwv2Nt4nTP1zPRImySKJ3PdJ+oixx5YyYqzljzSmf1Ngy48Ua/4fFKoXUFeA45U0R6QLJNDS+Dw0rRZBEiR/4vqsnqVfUCyY60PJfbfJPAAUEaB85BEsmU+RGZlVRkZrANDg8EdjFTnfPRPjjkcWSdSlASMZoJ40k2v8sh3ZmaBf1MyW6ihs8hueT+NRdOgldYDDD2l/9BC1FMcFCTl5Vcb3BO3d+TQNc+nLxzG7AyzQzLVKjDK6pIBTEketMddwAAAvnUHiuuYTE5XLMZAjwcNyuHBGBwZ8jaFYDbzRN+w54YhjeaMKXbMEdD5fBY4uDEoFMz5FLvIon0nyKrS2FO+TMMZo5JUC84GERHjY9AjbPPY7h5AcDxZ8mhpiTKErdkk9QdE2R4GAWjxIRtr6s1gNyCOT7+OQBQYMCRSBIWSIhwph6ZiDIYWPSXzplIuiCfFeeOadh6JMTZxusSuaP1s+OIV4G4Ry2npsVXsf3qt65kOsQhmy8SKQWY8XGeftxoSoCtHiqC7KQeWY/wBq0j0fpaTq7v0vBZkQf5s02MQByWMcpNrbfcCB+/Ggs+rfCyh45flMzEZXLTB4/n45LBALASsx/H2+91xemBDt7cQjwJzQJx1aXCmZSaDCORgqkKR6f71qKPAJZWg6bGXO0SnF6uQ+3b9Mk7hwaNWTwD/fTs87IuydeoQx1YGbAmZjg7iVLOlupB9y3Ao/3BfL6ouMe3eTgIb+hnxHJxWA4AEls0dmrpiOfHOqzPimSCaaKELFIo7gxnGViMpIU3B98LBG3ArXj/i2PWCiGURSIhqPv9OdcrFav/cxXvtAD2AuuN2ocWFzIchVVSxbbn9KDEWeNuRhncWNmzwaseKJ1FAw7SMuX6njKFkWVNwzsZXFAhCN7xlgf4B44sr4yl0+aknOSiH0dTxF25GPXtkw1ukTnlabgfvw9LPITJPkGOUKQo6l04fVjYEbRNjiyQCDYIIAJX30s2WyO05yExpJhcfU8cD5ac2F7c0Z3BWBHkgEer2uwYkwdrY2WsqY2VJuC5+Mq/KZG7cQsyk+knaASR9xHmhtfz3iijWTqAKuYu0eq4JtiRXHoQsrHaedpA/Iugpi9SIkkQRJjZ0vHy8j3h5YHJaPwtyLYsXRHPnnvC3RysnTF7Lb1Ob06daDJZVmgZhRVgpX0cEBTQ8Ej6F0SeUkB9sqlLTJj4VxfCsm4kOBySODz9vjVzrF/wDh91KGSI9iJcZt1S4JYAwkOVLBatQwF1tAJs+bJ2mqDRo0aA0aNGgp/imeVcd+y0cclWJpa7cIsbna/dVJIHuRzxr4t1O5oTh4e94ZXdI3PEnUJ1+pJIzHkQo38EsORyV+of8AiR2jHDHMzPG8lfKItvlP5RA1jYoamY+KHOvlwmcyZQlnRTFZypIiKxsddrLj4woLudvSXAHK+D5YFsXNjWR2MvdeQ1mSRghnlq48XHPG2MFQGcE2AL9O2/OmIrHf20cb1jKkhYZZlYkBRX08aBbb23njmzpo4jTO2wDZtaaSKEU2LAVsgLxuyp1YgFhwCfb7VH3F96bYY9kOXOkYI+WhTa0SKKpmIs17llJ4BoLGOKKTHYlTlS5Uu+J5n2fNvAH3ySLdRYsY4RbBPINCqagzbLZjyOWEvaaeHzNZGzEwRddoV6pBRPJFgk6R63FA5U7mxk7MaZe1r7MZQFMKL02WctbH/wCZNhSNWMUsvcBYxY+UmNtcg/Q6bjbitL6jeUwAAH7e2g6zkRQmEIBKysHPTcNisCCqBysrZbsCtndQur4F64zco5Cdq/nIkKf4fHqDAgqlpsqrmUXyoPPPHHHCKhhig7GSsMwb5fp0DVNkL9xly5rtFa/A8A8WBprHwnl3xiNcpkUxGJj2+nYhDD0+PryIeCeSab9tAtJ1mNfTDI0sqUBj9HxiiqASSGyihZ0sLe0Dz4Pt5HEJHaf5Bo3YAbsjAystvQFUW8jUG4IsC/F0dMQdRnlrHGZk5LgAPH0iJI4k4B5yWABPFcEfxqbMw5Y98pgz8cAD60nVERgK2sxSRmUckDn3rxoEWwMYs+zGwCCyqqyYuZAQeQdxCsFN0Q3sN3jXZMMSIISYmFrGvT+qs7kKST9HIADAEVt8mqqhq6jeRd0cc2e1IApTqGLIxqiG2ub5s83RA9hWqrrOLG//AFSK4ZRb5mD2yAzlixzsO1Uhb5qr5J5J1FciJWdpI+582SxHbrDzAu7i8ZvpZIrjdwTzQvREi5Mm5sdJshDvJiX5PPSrBcxE7JzZ/S1ftzWpcvKHyasEjfEi5JVhmYwAXaIyzKuRjHhW3AGj+brS+O7TqkfM2Rw3yWXKEyIrXerYmXw7gLztJPBF0bsG8fN3KczuS7kIMmVCgTIjKituZhrYkjon1qDxzQ86r1lkSaSTdDjsI1fNhjTu42RjuQ5yUiP3c+lhV0RRHOpo5lkk7rzSEwlu5MVEWdghFJ+qov5mL9JJBB4GoMrpMkkkccfbgypwrY2dFIwx8lQo3oYlG2JmUbylEErXjQK9PUO6xJCskDFiuOZPpSE7lY4UzU0Lj1ExMeCa/FaDPhaNTG8WTnYMZVkaNyMzAbZW2hTOvJpgTQDA3t5r+nwRy/MwnHELBz85gr5UjxlYhrcHUD7QKI8fuzPkztLBWXG0o+p07NJ2x5S2FME6qK7lGgeDZPgnRF90qSHuQSSFcqEALh9RjALR8AducpVc/qIo2QQD5+joeBzf7jXzPpUeyTImx8coTHed0p6Ja7qSLnaWZRW2qbwaOt58PZMUkCNCT26oKfuSuCjA8qyn0lTyCK9tUWWjRo0Bo0aNB8++P5ZDMuPB/wBTkRsnev04sC8vIST6WJerFWAPJAB+ZsmN2opY4zHhRMyYJK2+XlMB9SZQCWVWT/TXAUAixrX/ABNAsss8Id3g9c3UsiOlMhjFRYiOfSpHC7L583ZN5CfK7kZ6i8bpECmL03GjJ+m1D6ik+klRuom9zn9gdBNi45Xc2RuBgeF8iRRuaad7SKMxqeQikMQOG9X+sESY6P3QJLnkXKCSEBanzHSgTVgLjxFiVqiwo3uNQQRNjgQxu5zIKSFtxKZE08S0QSLPYRfSTY9MX23WrJoZHcRwud8paDFbavqnZScnLYg8BomJBBJph6bQDQLRjsxlYJPmCJGMUkxO2SZdomzXuyI4RSp+KZ+edMw/KAN2laVIlEuPBuJE8snEc2Rf+Y7ygKsf6RXkNpVpYe2xKyIqRbGKHbtxIJF3HaAO22XPuFCv7EXbZjZJVG3turoCQgCxy9ruAEE128PD+1a5kJPuToobLTZLLK20MCM2ZABNmTLsBgxiOVhV6RmUAG/3B171DJi7kHzeO+RZIhwYCVx4QGtVYr6ZsiyAy3Qs7uANV+LlOZIcnGARVjMeGrqzDc5btwx8cbYyDLKLO/cC1c6sOiYCQwIGmbIi3ywgxIwfJdwpaLGcGzEzbjJkGt20AUuiHIYp5k+vLJOicNDjOuLhQcG1kylrfs9wgaiADZPLUWJilN/bxHQqSfl8GbLsFy/ORJxzR4I86TmmjkYnIMBbG2hw3/Q4I2mo0jU1lz/kE+fFbdMZWdE+1MyJ9r8xjL3yZE25QLjwICEjQUAB7UeLJOoFclIKXvRQqjrG4aTpDIpsujgmJyyPQBBPgAEX5DeNhALIcTYGNRKenZhJ2qaN404rgCyASRbEeSStnY2Wih3j6zkSBzsYSpChIi5YRpuMa+kbVa+SR5JBgbBRpBFMZJJ+0GihzE7ErMRvkMWfEB4s8MCCQQffVVNkneJSsGPk9tykxKvizxxMRvkljh2h1Cr963+fyNd4uX3oESpJAyscTGmlUuWH/mY2dt3PSMfQ4u+PGvMkKX+rJM5xaqcKfnsU+j0vQIyoR3LY0eCfyLgbGYNGWjjdWKuKcLDkACxNh1zj5AVQWQVdDjmxBNNlBiJpJ2KQ7YVzSoWXGcsI2jyoGIWeFzZ3n/ePOqnqEctSQGE2h35HT4v8qdPAnxGIYpw4ZgvNgH80/wDEdUk4mRXakjllPpzUVQzQZUYAVJN5q2HPN1wdEuREsMTF2jgaaQ40xAEnTJiLSGQoSeyxJ9JAG3b/AARXZylysrThhIVOB1K6ZZLG2GYi/StMG3A19w4JAu8fJZjM5xTYlVeodNsvW57XKxytkUTuOwfk3wG1US50sT5MZRVSIKc7DjoxTbjuabH3/awUq+0V7eRZ1fYHTB30ZMnbEuGz9NygCXVU2F1lG2pOWIKedobgXoHJE7kuNN3i6g7cHqUTAiqJMOYtgsCy1urkn9Ju9v8ADUztu3xRwTAk5ESDhnJpZQ9AkMEPJ8/3XWT+FOrI0vbnihgyMtVdlD7sbNWiGkjHKhyPIPJ4sHzrW/C8ATuKshKKQqQuPqQcWULkkunIK34B4JFUF9o0aNUGuXBo0aP5/GutcSqCpB8EEHQfD+vxxHHZTJfTISwXcrq2fmMWN7k5ZO4LtBQANceKbpmNJHJLkSxL3sdNkeNZU950DusYUlbWN3paJBCDmhqy6h1cIp6igIgxlOH0iO93cYAxmWiLO2rv34Hkcp5WG+IIvqLJP05zkZZYna8+QV2AyHywpFs+PUeK0AuG8AWKUMZYokxcOQDdc2UpDc2FYRBGQHihR59OmOyrg40Mo+XYx4ETgldscSNLmS7SNrMardXIYj21B0LMTF+VJ3bICkj/AKkaSZGnkYjy3ZhQUeTuCj83LhRM6pj7nSRlWCRldVC99xPkSqpHJEcgSq8M1UBeipuozFQuUI+JZVyURbK/LwKI8SJuTt7jtf8Ac+L05NjhZGi3g90vjNIXDAwAd/MmPIG8tKEv2Cfga5x87tk5SlRDJeSIVA3Q40GKwxlZSaUdyiAPJUNfmuIpJGMWGTGRceIy7TbVEs2c4KgFWG9QCfwdBBhg5B3SD5ZZMUMm3aRhYakBQtjl5xuH5NjTLdSeSNhAwgaJKZgm5sLF2hVxxfJyZGTkckGxYrRj56rCs0m9Y3vMZCBXYT6OHAa9nYBtvN7WNXpXpUMkEjl8djLDLEYk3lRPlyDZRWtriNtzkjxTH9RAIbfEMW1I1R5sNFaKCQVDgqQzNNOwsSTsF3AG9pZTR1BgdS7UL5Amlhj3kPmyKJMrNcNezHB4SDbzYsD/AJOoepzxpIIhlA4e15cxwfqZbJIFbcy0WEku6JFHG0MeRQ1YxxZbTFzJDHkRR27uKi6ZCQpRAPtMrLu8GwOLHnRXmfh4rwLC2N1JEamXfciyKjKwd0U36g5F/wAn7OLA40aROtp2UMkUkZmM0HqfzI7juQMfWvkDcAL8XnczLYZMxXOznbHWUd6JGYFli2gN6lVSGUsVqm4s2OGuj9VbY+VGkUndRYmyMaImaOSVCXkmiXb3FVhdFf1LRNmwlkljllqCRykYWNGS2ycc9zaZe4x+pjjYp3HcCP8ASQSXOztWVEpgbnYx/wDqd0FmfEN/SnVi3oBog/8ACPVMkzdjIDJHL9OLFzQwEeU5Vi8UsSkhUL7gSfBIB/OosaGCOWSJCyRJKe6KIOBkbajmjsA9lqIN3+kf6bB9cuMTTGX68MsW5qIAyonTa88ShqSdPUJQtWvsNVksThZshredsQs6qNyZ+OaRHJJ4eNKLhbPKm7saenyZayBtDTqo2oANpuBqycRWJVrJYGJSbBLcE7Qtkt8zFCweSN55HbFksp8tlLHGGx5A17UeRCQPwFP51B306BI4cZUdJJIzN/THYEc0hbGn9QBkcuwCWBa+aYDUXRe38vFGknYWbKBx1Nk4GYoP0XD8mOTke3kgg2TruDKEkTCVBhxyzhJFABXGzUYsstVaI52WCfG4WKFyZCxztImVtWRzHF1ARWe1KAexmIa48U1cU4JNGtBZdGyIGYbo9uGZGXMjeguDlRm96Slg0MbMq0BwOPtPGvofS9yCISFcjI27XlQAN22JKsfcqdoBr35r8fMOl5bieYGBpcuKMw9Qx22qM6BSyieNWH1HH/5AjnnWl+HMxoxjwpOWienwZ5Rw0RrdjSEMCZQoJXj9AvkbSR9G0aBo1QajnjDKym6IINEg0f3HI/uNSaV6miNDIJCVQo28gkELXJsc+NB8b6rm7TL1iRQkGP8AR6VB+ksRQl2rdr4avyCOCouucqBDiyqoZ2bqXUgpLWka7wvq92okqKokDxpjrM80/UDPlRri4nToxJDB6GsEgRgKCVLsa48CkFc80mA0s4mYemfqUwO5wNyYqEvI7XY7R4WuAwj8HxoJ+nRI3aLgmaVxNJHt+mfnpIwAPPpXHR73CvV786scwdzfI22R3hl7TR0LbOl7EJugAVhQg/sAPbUWF1Rj1AvDIBG0mVt3qVULj4lRgkWO2jDnx7HyTp3oqqFxR2yoZunUUYqDtx58gg2DahjzVcEC+NFeQCCaSSGyI5lCxOBtKRR5mPiovHDKzIxPg7eNKQZbOVAl9UsW0tFwwlz88tvsgUxx1U+3sPGknxw0DMGkSQYGOUC8KHn6gshYG6Ub2HH49+NaXHx4oclUb7UyWZfUtdrCwl7e8cFgGZjx4NfwCXUm703eZC8XeeVEEgrZgloYUD1QSSWQ3f8AuIPvrmPOkkjTJjCvLGH7arIWrKzJtiPbeUCXQ/II49/OldPSYqvojaKPpu6931FbdkOq8829V/8AA6k+HFMGRiRLQSbJzHmplO5oVDJ4HhWW/YiwCfyEcSRAR70CxxOzyIUrdj4Pc5Hp9G/IJJX3Zh7WNMdZLrH251MscS/N5Sg22TPNKRBjtXO1boj8D9tIxYkMkNPG6wHp+MgCyAsokyInY1422QWcqPfg0QLTrayK2VNvisPlzgbY+WgbtQWCA30j+rkA+TVWHfUcbKEeR3W6i0qyh0GElRwkKDtjQn6yDdTE1ZH5smiypzB/iRKrM8205cEHlFQI8WTCaVDt5C0BcZPvYbwcRBj9tVaWWOH5mUkukrvkRCUCCRKCH0fbR3FL2nnXbzuEQLLQkqsiVQvzLtGyvjZIUjbOq8KzHyPNkHQexS5GLPsXF3Qf5rYVg7EEgYTxkj7gf0EnaNnlCCsLxyLGiRZG5jDKMLJcKVyYTtLY8obgPHTKN1CzXpFa46dGZI4WDiOcdpIZnARocmIBXxJAPtSQhnXwDvYHnTEixGKUsO1h5bsuUij1YOUwC3R52Mw8V4sfjUCkMymK5t64glILyGpunZZFAiiD295LigByPdSC18TQPMuSshRZRGr9RhVKDkUIciFwpLAELuHgBm/OpoHnaSQmBG6h2QkmMWHazsYybRIAPuZY1bnzRU81Wo4UZBCkEu9Ufbhl2thIAe90+d+PSw+ziuB+RohDqbhi75FLEQmP1FwNzOGSsfJWhTAMm7cOCf8AVu1Z9MxGjdg8XdyMSIRZm1AfnMOVFG5W8syIormyq15410ZkOyONVkBiMeOHb0zRqv1MCZj/AOchLGNiOPSfc6ixJnWGKOBzG6ZBbAkkbaHKs27DyFHEcih2Cg8ENxWirWKBSuEsUrMysZOnZrg7a3H/AAmQ49Qsen2vgDlaN/8ACjhsiRIURUWVjk4kn3403tLFfHakHqFDnduBHI1kuk72SdRAHxpHHzuArETYjptBkhUcld4DivYDj8an4emjIglLNkLIBHB1CIEuYxW1Mj3DBrUlhV+aJNB9C0aNGqg14Rr3RoPjnxH0mSd1wXt5crKM+a6kHsY0bfSRm8J9OiAfe/N81uXJHm75b2jOlGLjleCmFi+qZrFEbwpse/A/tqviLpnflzcTDBByq+dzC4ZYiiio9pP/ALfFcUG/4z8mKkgyJovTCzRdLwbPGxmEc7x/hmXdR55B8+NQU3SJoyolVYdj4+cdvI2HZZvm0WSOSNjQ4sAVZGrDpjN3YImcO5bEYN+gKelTKCp8nlSxFfiudc5OHTQx7XTGmlnUKppVWUnHgYcgghYg1fqDMQfI1B04j6ciAzyNiwTxEEjvNiNLDMo3c7jjsTt8nzxqqijF45WjRxOlBj7UZlNc+1/j99NQxgzswRmZMjq6doEAvcKkgua2/caFfzxzFmYzS4TCKJ2WbpUBiceS2Pkbivp/WF5214Svzq0XqnayZW2PGTNjZRV6uSOcRwzAWAUILKD+WUj3rURT4U6RwidJGDCPp07E8FUivHb1+4NsCaFfn8OmRPmC08hkWDqBjWWxFsSUdtxt5LAdvyfZWPgg68z+mbJlgdUVJBL02RgANm+SSTHcAEAKxZTVDlGHFUZesSNkRRQZDCKXLgbGMJjC7cqJ925pCaG5iFAAup75GiuE6bUa48wMTNDJ09mtRIJElEuKbtd29BQHFkVrvG6pA8pyqcRDOeGVXStqZcKLIXUkUoyUc83zf517JhHMWye0eooqM4baY87HugFH6d0Lhm8nuJRGl+qxfb1CdJEgyIxBnIWCGBpAFc7AAxbfslF8kMwrVD6ZLVKMxEi2t2MnYKeICe8OeNVsBYy7iz7IPPGpeodPeNdkkPe+75uAJS5iFw3zUBUkCVSSzKDdXwBWqnCwJTMglkU5uKrJPGSxGZiGOlcBb3syAKTfgIx5WtPfDnVIZ4VjMu3GSSNcKdNolw5BH4lH2gMwIvlZLbj1ACCDDDyKRIDlLLHwygg5sCMDfn052P5qrYAjmgdSyykbAAMlmUGyKHUcVVog7h/1MNixweLFnjUmVgDEeQMOyiOk8scZBOJIJAFysdTe7GkBO9P0ixxVBzLXdJJsBBI+YlgiNtdWuZgsPuJI9UfuTRHPIKZYi7cfZd544EhEEqgGWANYSeMimeLuDtSRE8bLvXmON7OCkbTy+p4lO2LqIUh45oJV2rHkAWeOb8jzTeRFK2Ms7zRrFGTLFkYkX72ztCLLRSiVu4oHodSaIbivGPCA0ExVGcd1cSNxSv5XIwZzQRm+4Rmt1tzQ5CrxzjuY1V42nbexEyhFyDuqSKVgV7eYg8SKab0ny2usLGWVJY8VvnU3KJun5rrHMjKSGZWBW2HC9wH/AFWCaAvMpHyMffPHDl4c5tcrDXtzxLVmSQEefR6lND0myTtXSHT+nYuTFthTE6qrM+4WcfKjjBUoqFyWYKdwsnngXV6DiOYQtC0kmZ07LSRgmRkxXHIn6YpXU/WAC/efAJP41v8A4Z+ZebdNG2LKvBMLb8XIW7sA/a5JJvhvzY41ncPJSGMIcvL6e53/AOH6iomhNACu7IvKkMOFkH6uPOt58NdJjhDPEAqSHfUbkxNY4ZEPEe4c0vHjk1oL3Ro0aqDRo0aD5/8AGePGjPHPMuPhShi0GOp7+XK6nd9o3CqB4vdzfHnNZeQYYlyJovlligaLpGI3qkaWiBK8dWJfsrnjcfc8/QvibFEV5UXbhltBJN2DLIyBvsVV9RsGuL/t+MBL24ZfopOk03cHz2bA7SLIzlY1X6ZEKdw8MwAqx7GoK7q6lN6BWMkEeL2QOfqYI3ypZ53FJWdbHqAsXrxeqqhJhIhUMM/CSPcWlXbuniYFqN39o8dtuBQtNepXtlkcNHDlwuMtDRZu0VKzsi8KDSbyLplBBu9L5zmIRs4SImUyJ23Ehx5aVjNAFvfiyHbvjF7aNeK1RZd0QKBGCyxA5+IrLtEkMocT49A0SsTH97EhqvIqxQGyzzrHGW3tw8mDNI3cQtu9UsEp3E2D93iuJsVCzIYym5Znmx5GO6OLIHpmxWcH0xSUHj8WCB+dR40JCx9iER2zNBC4H05wrfMYTsee3MoLITVkAaiuc+PuI4nlI9EePmSIDsUB9+HlKxAtRwGpjSut1d68kiMm5MhzG+VIEkYVWNnwABW59pwoPJF358as8RF3oyRgQyIY4u8tXG8m2Xp7qv2urNcd3yGHj7a7Dz8Zkk3CSaGoYs7uqA8VK4jnaGiN0ZCxyEnnYDTbtA311JJVx1yGaA5Tp2zsAOJnJ7nmgspsmvc7vbUUTxymTJmUpHIe11bHeM0jqjbMkKeFFoW48njkka7yGVTlxzrJL2okjzFJW8jH2DZmIov1x/seVqyDY14sUwkKM0X9Q2Cr5h6pjiIhVAJC7ytKw/2g+2gVjw5YoxiTZCK/bR+m9SUjYRafR73JCFq4P7+RQMuZKTKu2JYM9UaJsSZQIM6IFiwUL6VZt29RdWQATV6IyqwyRsJZ+nSEjJxX9WRgs20irJJ2s5bf/wA+oG/M6R4ceJJgud04Myw5OPYmx02lBb3W9e4QEb8Hz4AX+DOkmPHaSlYtyAupbIwmK8pIjW00BU7TwfSRYNbhRdImEqn5eMyJDJZix2qfAfnfJj9xfq470T2699tfjlszupE87tk4qle11HGRxkwtGA4XIj5JsGufPDeTw5NE0oGXO/dVU2x9SwC3eQcBRNABbHiyR45H50HRyY2xJmjOLN3csiNo2aCRpJIRYX2gyDtPBpX/AJ1WJjy5Hcw4coZUgJMmD1HaSDSk9udDW4bvCslc8CiDdwPE8GRPFNJKTIHkycZe3MVhjDBpMaRdshuSmKqAfTZBApeaAZpE3ZGdEMe0zcbZHl7zaMDFxZ9XhhS0Td8aCqaANIHkhm6LmHcFmjBGK7LZ9Y9ifUNwNGr5sXbrgZEzg5GJ03qVL/m4zok+wpaEC1okkEH9+K14mZ2iyR9SeH6a3h9VjO3btCks72Wum4UiyfwKM+b0pJO4WwukSIzpXZyjEzA8R2QAA+xhQvm+PbQOdPaSJEVZsjF4ZUxOoAPBKAtUJ9u5F5Hk3/tPI1t/hrC7asTAsDSHcyxyF0vxa3QWwPAHitZbpfTJVKRLhZMcYamHz4kCL6eO2zlWUqKo81/c62fSSSoJieEmyUYg0br2JAHAIquD4BsCiw0aNGiDRo0aBHreD34Xi7ssO4ffCacf2NGv4518567klDkSJ1SVZCpdYZkdVVWjZUURsjb9r8tQu6Bq+fqmsF8bNHHGyyJNJTRlZJsdJ44wzgXufb6QRbW4I4P40HzHKHbgmnii2s3bBycZ0kWZ6AO/HA2BDIT7L7cWa05tiSR27iJilhG0im4yzQMu4FRvxJFU7fwfH510JoSseTjQxzRxUxfAdseZCXUSBsUs25WIA48geRpnHwXjycmOOWCSVG3kE9ozSOrMsGRG1xSgqzEEEHcCCQTuEVWRYOPGpwhCRJJH9fHb/wBT2mkWN4JFbb3vBpQQb9/WNXeTjyTJI/1WaWNFkYen5iIUquAwqHLiJRyv6xVfdWqnGwT3zhR4++MSuHxpJSkiEm+5iySbXZdo3VZvaLH6iw+ZjPIqiSaNYnWOSeTcIp5I6295lFwZC0Pqij+/F6CeGYyu7GE5EkmzeAQFzY49wE0ND0ZahQSv4VuOTTOUZJMiNjlLGzs4x53QGKdX+7Fnjb7ZVFItn1ADyQCDG6dNKrmXG7Khnllx14DOAXXIw547JloD08jk+3GvSVkiDr28iOfc2wBUXMJ5bgDdDnoB5B9RHFXQDzIksxusEyy49bsVNrTY5CeoKjNeRhy+nhTxyQeaEMmJiTYjEGU9MMhdGUAS4JaQGtnJERbcSRQC7CLNnXuJCsKwyyvPmY0W2THlCE5GKxLse5sbds2qPSbV+aK0AZY53VI53mU2m0dUxkBjKgksmXjseRYHJF2SNBNFiSBo5DLEnUShbHzYzUGcu2gkjEFS+0Alas1/Ok8dkgLR9v8ApefOnqx5iGw56NbRZKqWFD9r9/d7HjmSkjjhjadTUKt3MDL5YlY2N9iVkB/F2eNInGZomgERzsSKu906R2+bxpAxJEbCi68kAg0yjj3JCX5poJZDX9JyQBGu7ccKckBvu2gJRU8ixR97OuspZISksuC+K5b1ZvTX3IdwNkRlWBW73Bq58Wav3Bgd0EOHkieOlD9M6moDKrDdtV2F2F4FXX51PlYyQGRhH1Ppe1g2+MCaI2aoBd1rb2R7/wBxoGsATTRLIJ4+pqBI0ckZEOREojobCtP3GcAEEEXya8ajzujyPtEmMuROicS4s64+WilbHcjBC7rZ7ANWL5vg+dxpJWkOT0zIkIqJ5g2LL2mD/wDmKPVwRyqi/V440lhfDqREZMXS4cgqyU2NmySEFh6yASfSpFAEeD+LoHsvDefuYxxm6iYiCyZQMM0SFRsEWTX1Bvu23Aijwb17P0lVCFegSEuVbb8wfQYSQgO0kD0KCB4bdRvk6jhwRzG0HXhyoAEzMOLApidoBUc0a4Hg1q5TooA7Yg6swE4tjlVuAu3vug7PUeByaHHvoOeldFgZYz/SZ8cOCzGOXa/lgqyEOrsCjXtJ48Vxrd4EIUEhpKNUrn7aFcXzz72Tz/Os50zpIuJjjZcZBkQbsstsUk+o/VO4MW/cjaPwutaorVR7o0aNAaNGjQGsR/4gYlbXWfNgY8iSDe0aFfWS0aMLLIpHII/ayL2+q7r2L3ImqSeMhWowH1+PYUQx/F++g+TdYb50l1hhzY4G7qJGrwTjYQJDWwrLcgIK1wT5/PmQ6TmUGaOcyPGTBnwiJkDbgVScKPWpIVKb00RRsae6bmhXj39UmiDj1CfFVZW2yMQHyIzwdoHBP2hiR5Alz+nZOS+zIixOoY0khbcjkPCm8sjNLHRZdoYAbfPBJAJ1FVG8RukTI3bxg4SPLQrOjrG+04+UV7b9wiwjDyLqxeuospTUztJuVTEuWqMWDi9sediAG2Bbg1zzySRqXHhjnxXKN8xjtumOJ1AiEwR7eHjlILbAbXep20f2YmPNkkiRXZMnpphjRvnEb5lJAW2hJmCqZ/u4C7qBsil4BePBELxqUeRIo2mQIWPakRalbCkDAuivW/Hcjxxr3LZu3unL9tE7idRwwyCNy7EHIw1b7xIxYkAEMT7WQ0uScdYmkZsUs8k5ysLc+JJZCqHA3CMO2ywB5P2+q9cdNxmHbyCSuQ6ssmb076sO62VTNjp6WBWmJocgXWglgUnbmSS7n7kajqGAxdHCjlcmEUEUkANQolhY40zBg7DNlYwGMGIXu4Y+ZxplA3s0mIo3R8AofJtjXsdRMnnIVVVhNcuZ0hgx9IXifHYE0dxZlF1XIPu1jQwuGaHsNkLJ3HbDm+XnLANRbHlG12JJtWNGzx+QVmwE7UsqQGLFcmR3x2GVizeo89hCJICPuDpRQ+5oa6kgTIVShk6h8uCqyJL2s7GZeGPhTOD5FrzXhr07kRpjyyz5MWTjmPYxzsZdqTraH6kKEjfztahyFaiPGuYsV8hRKYcbqAt6yMJ+xkLaFSSti23Ae4/twLCvhyVyGZDPh55MYAhz4/l8lAGBKGVU9XNGj+F/ubSXp+RTGKPqWFK6AntOmREtHZsVSwHP32KNAHi6PEmYh7S5GUNkqdvsdUw6ZireHyFCrw1UeQfPJ515NglkUydNDqgRL6fms1IvIIiG214r8+f76DvOknjlkWbKdk2FWWbpRdS3asHuRLTqKPF++3n2WMUW1iJe0ZNplfE6dJDJIC/2mdyAtkcn01qWHLgigkCHq+N3nKqWDSFNtNSxgkxg7/YAkKfxqXpvUEkJ7fUeqS+Y2URchgoXcp2Ups7q5q+aGg76Dgb5EWPI60oQ+ruikaiGALVSg7vbigR+NWGL06MIyL/VpYyxYl3YEbPZQ5VyCWPgGz/YamwRLwqw9SmaNxck0qx3u2sfTuAYDaBW33YcWdXbYa99pD85YYMAJG7ZI9NLGGrbzZBFHz+dBP0no6RP3FeYlo0UiRyR6RV7TwHbgsfcgat9cxpQqyf3Js661UGjRo0Bo0aNAaNGjQVHUcCVix3pIu19scsakBihVaIA9PJBvyCReqaT4eiDCX5ZoXjUgHFeg30v9AoHa7EJu8EFuAda51BBB8Hg6Rl6YlsyrtZl2l1amquP2NUKv/8Augw3UY4Fjd58qWNsYqnzTwsJl+pSgsQVmjb1An3B/nSOdDJtyMmFnibhnbDYZcUu5x5xXra9MGPj03XOtN1NyjNK0+TDGkSBlkiEkduHAY8Md6lhuogDaLsNeqDo0qDJicHpskkqna8LvjSyIBs4iNiStrVZAG2hVXqKqX6jhieXszZGI0zB5fmIGbGmUemVxDupFkbapd6quDrvC6M8TwsYZIJJQF+c6S26Bjbqokx6K7QpB3VX7itaPqMM6wECYqIUfcOoxpLHLHa8tNGS1cXd3zyONIZPS4sRp3xsbJjjGOAkuDIH3XMG4iavWGvkkgKT+ToKoY1CXIlRcoAKvzvTlCZG8vRWWJTyQAv6RRrj3FgDFkr2pMzGzEkWQQxZ0ISUyoOaZdlLdHxY5F8cWM3UVAkWDqcUWRAW+ZlfGUCSiAS9BQxTdXpagSL1Dg4XUO3uM/TuolCwjZ1Af/eiulKGZDV+xPO7zoGYg0B248eQkeQkKxz47jIgQhQLETE9sCqLeGBBu7IquoSwq4eYJMyOyzZGJFJDPAoZSm4JfdUNw3FcqaqzrQDCaP5EDBliVFktcaYbccsOQyggSg+QRfqH78xQzyDHxdnUp8dmZkX56FN8xP2qysFNj2ogn3vQVS5Fgxr1RJgwVuz1OEV2yQt3tUt7/wB7F+5MrYqrI7yy9MxcpXRTPC31CNvCsp20WKr6TfpB/i7K5LjKSTKwpqZO2jxjbHTc9wXdnih7Ee+vczEyWiJ+QwpneXc6h/S4Cja+5o+X8jkcADnQVr5gT0Hry3Gmx/RCTv2nk8Gj/t/bU2NMzCz1jejqxQxRRg0hXexKqRxRB8ctqyiwH77len40a7iRMxUs5Una21FvyxblgaJ9zq4yFmCkRLGHAFMw9J9Q3ClNix4PPP8A3Cix8CHJZVafMmCLfq3IjBht3EqqbybJ8/24ArUrCAbs/wBrNf8AHjXsYI81+1fj213qoNGjRoDRo0aA0aNGgNGjRoDRo0aCN4+d3N1VWa/48fzqjyOiyCYSRuCdoA7kSMF9YLUw2yAspce45v2o6DRoKGHpceO0awpMkYXYEQgxKCfLITZPgWPAocC9eEIe+sTPAyoR6IKK8sdyllqTmyKsEn31cyYysCKq/wAEg/wRyNQphFSCJZKCqNpII4PJJYEkkUCb9uKs2FfixlwxExZZAGRZIRSUADYoE7jZo19xrUM3S4CsSOuIYYGLsNm0JKDYZRdJ6iSbvzq5GM/q+q3LbgaX0jj0j08jg8mzyefGpDDa7WpuKNgUf7jQUOJ0dEpo4BxJJL6Mh67rMQ/4BBtjtPAI8XzrqHEZY44zChj7zb/mZd5ClyQUJBskkUpqvH41dT46sVtFajYJ/SfyP50JADbUfVRKsbF0PY3RFe2gqsnAEhIkw4XDBizWpsgCgbWzuPv7Vep4MJR2qgCUoX0sAIwtELQ+5bH/AG1YJDQIFf8AGvTFzdm6rz/9aBKDDjbY5SRWBLAMxtSzEm6Yg8+3NCh+2msbEWMUt+K5Yn3J9z5snnU+jQGjRo0Bo0aNAaNGjQGjRo0Bo0aNAaNGjQGjRo0Bo0aNAaNGjQGjRo0Bo0aNAaNGjQGjRo0Bo0aNAaNGjQf/2Q==";

  ngOnInit() {
    // this.gender = Object.values(Gender);

    for (const key in Gender)
    {
        this.gender.push({number: key, word: Gender[key]});
    }
    console.log(this.gender);

    const params: Map<any, string> = new Map();
    const inst = this;

    this.CreateUserWrapper = this.fb.group({
      firstName:['',Validators.required],
      phoneNumber:['',Validators.required],
      lastName:['',Validators.required],
      position:['',Validators.required],
      nationalId:['',Validators.required],
      email:['',Validators.required],
      status:['',Validators.required],
      gender:['',Validators.required],
      file: ['',Validators.required],
      base64:['',Validators.required]



    });

    this.CreateUserWrapper.controls.base64.setValue(this.hardcodedBase64);

    // params.set('actionStatus', 'Approved');
    this.stewardService.getToken('fortis/rest/v2/entities/sec$Group').subscribe((response:any) => {
      if (response.code === 200) {
        inst.systemRoles = response;
      } else {
        inst.notify.showWarning(response.message);
      }
    });
    // this.stewardService.get('gender').subscribe((response) => {

    //   if (response.code === 200) {
    //     inst.gender = response.data.content;
    //   } else {
    //     inst.notify.showWarning(response.message);
    //   }
    // });

  }
  scanFingerPrint(){
    const fpRsponse:string=(<any>window).fortis.getFingerPrint();
    this.fingerprint =JSON.parse(fpRsponse);
    this.scanned=true;
    this.imageSource =this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/bmp;base64,${this.fingerprint.payload}`);
    this.base64FingerPrint = this.fingerprint.payload;

  }

  fileChange(event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.CreateUserWrapper.get('file').setValue(file);
      }


}

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCreateUser(form: NgForm) {
    const inst = this;
    this.model=this.CreateUserWrapper.get('base64').value;
    this.stewardService.post('fortis/rest/v2/services/fortis_UploadFileService/UploadFile',{uploadRequest: {"file":this.model}}).subscribe((res3:any)=>
    {
      if(res3.id){
      this.model.uploadRequest.file=res3.id;
     console.log(">>>>>>>>>>fingerprint",res3.data);
      }


    const formData = new FormData();
    formData.append('file', this.CreateUserWrapper.get('file').value);
    // this.model = this.CreateUserWrapper.get('file').value;
    this.model=this.CreateUserWrapper.value;
   this.stewardService.postFormDataMultipart('fortis/rest/v2/files',this.model).subscribe((res: any) => {
      console.log('>>>>>>>>>>>>>>>>>upload response', res);
      console.log("------------",res.id);
      // let picId: string = localStorage.getItem('picId');
      // if(picId === null){
      //   inst.notify.showDanger('please upload the required files before submitting');
      // }
      console.log(this.model);
      this.model.profilePhoto = new Profile();
      this.model.profilePhoto.id = res.id;
      this.model.fingerPrint=new Print();
      this.model.fingerPrint.id=res3.data;
      this.stewardService.post('fortis/rest/v2/entities/fortis_FortisUser', this.model).subscribe((response: any) => {
        if (response) {
          inst.notify.showSuccess('Request was successful');
          this.router.navigate(['home/user-management/users']);
          // localStorage.removeItem('picId');
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        console.log(error);
        inst.notify.showWarning(error.error.message);
      });
    },(error: any) => {
      form.reset();
      console.error(error.error);
    });
  },(error: any) => {
    form.reset();
    console.error(error.error);
  })
  }



  // upload(form: NgForm){
  //   const formData = new FormData();
  //   formData.append('file', this.CreateUserWrapper.get('file').value);
  //   this.model = this.CreateUserWrapper.value;
  //   this.stewardService.postFormDataMultipart('fortis/rest/v2/files',this.model).subscribe((res: any) => {
  //     console.log('>>>>>>>>>>>>>>>>>upload response', res);
  //     localStorage.setItem('picId',res.id);
  //   },(error: any) => {
  //     form.reset();
  //     console.error(error.error);
  //   })
  // }

}
