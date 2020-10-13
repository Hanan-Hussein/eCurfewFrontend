import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';



import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Notify} from '../shared/class/notify';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChangePasswordRoutingModule} from './change-password-routing.module';
import {ChangePasswordComponent} from './change-password.component';

@NgModule({
    imports: [
        CommonModule,
        ChangePasswordRoutingModule, ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule
    ],
    declarations: [ChangePasswordComponent],
    providers: [
        Notify,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class ChangeComponentModule {}
