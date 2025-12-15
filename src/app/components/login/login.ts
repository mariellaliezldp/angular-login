import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

type LoginForm = FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}>

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatSnackBarModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private builder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  loginForm: LoginForm = this.builder.group({
    username: this.builder.control('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: this.builder.control('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    rememberMe: this.builder.control(false, {
      nonNullable: true,
    })
  })

  // Helper method for template
  isInvalid(controlName:string, error?: string){
    const control = this.loginForm.get(controlName);
    if(!control) return false

    if(error){
      return (
        control.hasError(error) && control.touched
      )
    }
    return control.invalid && control.touched
  }

  proceedLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fix the errors in the form', 'Close', {
        duration: 3000,
      })
      return
    }

    this.snackBar.open('Logged in successful', 'Close', {
      duration: 3000,
    })
    console.log(this.loginForm.value)
    this.resetForm()
  }

  resetForm() {
    this.loginForm.reset({
      username: '',
      password: '',
      rememberMe: false,
    })

    this.loginForm.markAsPristine
    this.loginForm.markAsUntouched
    this.loginForm.updateValueAndValidity
  }

}