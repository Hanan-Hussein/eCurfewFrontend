import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../../router.animations';
import {ViewParamBase} from '../../../../shared/base/viewParamBase';
import {Users} from '../../../../entities/users-model';
import {StewardService} from '../../../../shared/services/steward/steward.service';
import {Notify} from '../../../../shared/class/notify';
import {ResponseWrapper} from '../../../../entities/wrappers/response-wrapper';
import {ChangepassWrapper} from '../../../../entities/wrappers/change-pass-wrapper';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    animations: [routerTransition()]
})
export class UserProfileComponent implements OnInit {
    model: Users;
    viewparam: Array<ViewParamBase>;
    response: ResponseWrapper<any>;
    change: ChangepassWrapper;
    confirmPassword: string;
    public profileForm: FormGroup;

    constructor(private stewardService: StewardService<any, any>, private notify: Notify, protected locStorage: LocalStorage, private formBuilder: FormBuilder) {
        this.model = new Users();
        this.viewparam = new Array();
        this.change = new ChangepassWrapper();
    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            'oldPassword': ['', Validators.compose([Validators.required])],
            'newPassword': ['', Validators.compose([Validators.required])],
            'confirmPassword': ['', Validators.compose([Validators.required])],
        }, {validator: matchingPasswords('confirmPassword', 'newPassword')});

        this.response = JSON.parse(localStorage.getItem('userData'));
        this.model = this.response.data.userDetails;


        this.viewparam.push({
            value: this.model.userId,
            label: 'User Id',
            order: 1,
        });
        this.viewparam.push({
            value: this.model.fullName,
            label: 'Full Names',
            order: 2,
        });
        this.viewparam.push({
            value: this.model.username,
            label: 'Email',
            order: 3,
        });
        this.viewparam.push({
            value: this.model.gender,
            label: 'Gender',
            order: 4,
        });

        this.change.email = this.model.username;
    }

    changePass(): void {
        const inst = this;
        this.stewardService.postFormData('change-password', this.change).subscribe((response) => {
            if (response.code === 200) {
                inst.notify.showSuccess(response.message);
                // form.resetForm();
            } else {
                inst.notify.showWarning(response.message);
            }
        }, error => {
            console.log(error);
        });
    }


}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true});
        }
    };
}
