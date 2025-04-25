import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form-example.component.html',
  styleUrl: './reactive-form-example.component.scss',
})
export class ReactiveFormExampleComponent {
  userForm!: FormGroup;

  private formBuilder = inject(FormBuilder);

  constructor() {
    // this.initFormFormGroup();
    this.initFormFormBuilder();
  }

  initFormFormGroup() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(65),
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  initFormFormBuilder() {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(65),
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  handleSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    console.log(this.userForm.value);
    this.userForm.reset();
  }
}
