import { UserService } from './../../services/user';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserRegister } from '../../model/user.model';

type RegisterForm = FormGroup<{
  fullName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  acceptTerms: FormControl<boolean>;
}>;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService)

  registerForm: RegisterForm = this.fb.group(
    {
      fullName: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
          ),
        ],
      }),
      acceptTerms: this.fb.control(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
    },
  );

  // Helper method for template
  isInvalid(controlName: string, error?: string) {
    const control = this.registerForm.get(controlName);
    if (!control) return false;

    if (error) {
      return (
        control.hasError(error) &&
        (control.touched)
      );
    }
    return control.invalid && (control.touched);
  }

  // how do we create an obj, we have created a class/interface
  // and here we have created data type of ths variable
  // and we are initializing thet class
  // class > data type > initialize
  // registerObj: UserRegister = new UserRegister(); for ngModel


//   onRegister() {
//     if (this.registerForm.invalid) {
//       this.registerForm.markAllAsTouched();
//       this.snackBar.open('Please fix the errors in the form.', 'Close', {
//         duration: 3000,
//       });
//       return;
//     }
//     const payload: UserRegister = this.registerForm.getRawValue();

//     this.userService.registerUser(payload).subscribe({
//       next: () => {
//         this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
//         this.resetForm();
//       }
//     });
//   }
// }

  async onRegister(): Promise<void> {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Please fix errors in form', 'Close', { duration: 3000 })
    return
    }
    
    const { email, password } = this.registerForm.getRawValue()

    try {
      await this.userService.registerWithEmail(email, password);
      this.snackBar.open('Register successfully', 'Close', { duration: 3000 })
      this.resetForm()
    } catch (error: any) {
      this.snackBar.open('Something went wrong', 'Close', { duration: 3000})
    }
  }

    resetForm() {
    this.registerForm.reset({
      fullName: '',
      email: '',
      password: '',
      acceptTerms: false,
    });

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.updateValueAndValidity();
  }
}