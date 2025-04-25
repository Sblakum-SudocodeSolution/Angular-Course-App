import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form-example',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-driven-form-example.component.html',
  styleUrl: './template-driven-form-example.component.scss',
})
export class TemplateDrivenFormExampleComponent {
  formInput = {
    name: '',
    email: '',
  };

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }
}
