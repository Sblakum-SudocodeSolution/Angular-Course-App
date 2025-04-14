import { Component } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  courses: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('course');

    if (data) {
      this.courses = JSON.parse(data);
    }
  }
}
