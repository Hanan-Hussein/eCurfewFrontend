import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordComponent} from './forgot-password.component';
import { MatButtonModule } from "@angular/material/button";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {Notify} from '../shared/class/notify';


@NgModule({
    imports: [CommonModule, ForgotPasswordRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule],
    declarations: [ForgotPasswordComponent],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class ForgotPasswordModule {}


