import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  userForm = signal<FormGroup | null>(null);
  private fb = inject(FormBuilder);

  constructor() {
    this.initFormGroup();
  }

  initFormGroup() {
    const userForm = this.fb.group({
      personalDetails: this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
      }),

      address: this.fb.group({
        city: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
      }),
      phoneNumber: this.fb.array([]),
      terms: [false, [Validators.requiredTrue]],
    });

    this.userForm.set(userForm);
  }

  get phoneNumber(): FormArray {
    return this.userForm()?.get('phoneNumber') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumber.push(
      this.fb.group({
        number: ['', [Validators.required]],
        type: ['home', [Validators.required]],
      })
    );
  }

  removePhoneNumber(index: number) {
    this.phoneNumber.removeAt(index);
  }

  handleSubmit() {
    if (this.userForm()?.invalid) {
      this.userForm()?.markAllAsTouched();
      return;
    }
    console.log(this.userForm()?.value);
    this.userForm()?.reset();
  }
}
