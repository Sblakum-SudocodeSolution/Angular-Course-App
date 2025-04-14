import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  courseForm!: FormGroup;
  submitted: boolean = false;
  cover!: string;
  courses: any[] = [];

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      coverImage: ['', Validators.compose([Validators.required])],
      rememberMe: [false, Validators.compose([Validators.required])],
    });

    this.getCourse();
  }

  getCourse() {
    let data = localStorage.getItem('course');
    if (data) {
      this.courses = JSON.parse(data);
      console.log(this.courses);
    }
  }

  get courseFormControls() {
    return this.courseForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        let dataURL = reader.result!.toString();
        this.cover = dataURL;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.courseForm.invalid) {
      return;
    } else {
      let formData = {
        courseName: this.courseForm.controls['courseName']?.value,
        message: this.courseForm.controls['message']?.value,
        coverImage: this.courseForm.controls['coverImage']?.value,
      };

      debugger;
      this.courses = [...this.courses, formData];
      localStorage.setItem('course', JSON.stringify(this.courses));
      this.courseForm.reset();
      this.submitted = false;
    }
  }
}
