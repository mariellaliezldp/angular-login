import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user';

type LoginForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);

  loginForm: LoginForm = this.fb.group({
    email: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    rememberMe: this.fb.control(false, {
      nonNullable: true,
    }),
  });

  // Helper for template validation
  isInvalid(controlName: string, error?: string): boolean {
    const control = this.loginForm.get(controlName);
    if (!control) return false;

    if (error) {
      return control.hasError(error) && control.touched;
    }
    return control.invalid && control.touched;
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fix errors in form', 'Close', {
        duration: 3000,
      })
      return
    }

    const { email, password } = this.loginForm.getRawValue()

    try {
      await this.userService.loginWithEmail(email.trim(), password.trim());
      this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      this.resetForm();
    } catch (error: any) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        this.snackBar.open('Invalid email or password', 'Close', { duration: 3000 })
      } else {
        this.snackBar.open('Something went wrong. Please try again', 'Close', { duration: 3000 })
      }
    }
  }

  resetForm(): void {
    this.loginForm.reset({
      email: '',
      password: '',
      rememberMe: false,
    });

    // MUST be called as functions
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.updateValueAndValidity();
  }
}
