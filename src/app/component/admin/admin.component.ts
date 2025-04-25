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
import { AppService } from '../services/app.service';

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
  courses: any[] = [];
  cover!: string | null;
  selectedRole: string = '';

  private fb = inject(FormBuilder);
  private appService = inject(AppService);

  ngOnInit() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      coverImage: ['', Validators.compose([Validators.required])],
      rememberMe: [false, Validators.compose([Validators.required])],
    });

    this.getCourse();

    this.appService.behaviorSubjectRole$.subscribe((role: string) => {
      this.selectedRole = role;
    });
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
        // id: Math.floor(Math.random() * 10 + 1),
        courseName: this.courseForm.controls['courseName']?.value,
        message: this.courseForm.controls['message']?.value,
        coverImage: this.cover,
        rememberMe: this.courseForm.controls['rememberMe']?.value,
      };

      console.log(formData);

      this.courses = [...this.courses, formData];
      this.setData(this.courses);
      this.courseForm.reset();
      // this.cover = null;
      this.submitted = false;
    }
  }

  delteCourse(course: any) {
    this.courses = this.courses.filter(
      (course_item) => course_item.courseName != course.courseName
    );

    this.setData(this.courses);
  }

  setData(data: any) {
    localStorage.setItem('course', JSON.stringify(data));
  }
}
