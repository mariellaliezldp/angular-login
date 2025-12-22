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
import { LoginModel } from '../../model/user.model';

type LoginForm = FormGroup<{
  emailId: FormControl<string>;
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
  private builder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);

  loginForm: LoginForm = this.builder.group({
    emailId: this.builder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: this.builder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    rememberMe: this.builder.control(false, {
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

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fix errors in the form.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Send ONLY what backend expects
    const { emailId, password } = this.loginForm.getRawValue();
    const payload: LoginModel = { emailId, password };

    this.userService.loginUser(payload).subscribe({
      next: () => {
        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
        });
        this.resetForm();
      },
      error: (err) => {
        if (err?.status === 401) {
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Something went wrong. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      },
    });
  }

  resetForm(): void {
    this.loginForm.reset({
      emailId: '',
      password: '',
      rememberMe: false,
    });

    // MUST be called as functions
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.updateValueAndValidity();
  }
}
