import { Component, inject } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
import { AppService } from '../services/app.service';
import { posts } from '../Interfaces/Posts.Interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  courses: any[] = [];

  appServices = inject(AppService);

  posts: posts[] = [];

  ngOnInit() {
    const data = localStorage.getItem('course');

    if (data) {
      this.courses = JSON.parse(data);
    }

    this.getPosts();
  }

  getPosts() {
    this.appServices.fetchPosts().subscribe({
      next: (post: posts[]) => {
        this.posts = post;
        console.log(this.posts);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
