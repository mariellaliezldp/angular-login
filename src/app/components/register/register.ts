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

type RegisterForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
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
  private builder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  registerForm: RegisterForm = this.builder.group(
    {
      firstName: this.builder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastName: this.builder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: this.builder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: this.builder.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
          ),
        ],
      }),
      confirmPassword: this.builder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      acceptTerms: this.builder.control(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
    },
    { validators: this.passwordsMatchValidator }
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

  proceedRegistration() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Please fix the errors in the form.', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
    console.log(this.registerForm.value);
    this.resetForm();
  }

  resetForm() {
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    });

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.updateValueAndValidity();
  }

  private passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
}
