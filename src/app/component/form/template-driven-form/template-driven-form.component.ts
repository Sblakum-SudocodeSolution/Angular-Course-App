import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
})
export class TemplateDrivenFormComponent {
  user = {
    name: '',
    email: '',
    password: '',
    age: null,
    gender: '',
    terms: false,
  };

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Invliad Form');
      form.control.markAllAsTouched();
      return;
    }
    console.log(form);
    form.reset();
  }

  onReset(form: NgForm) {
    form.reset();
  }
}
