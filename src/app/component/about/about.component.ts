import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  roles: string[] = ['Admin', 'User', 'Manager', 'HOD'];

  selectedRole: string = '';

  roleForm!: FormGroup;

  constructor() {}

  private fb = inject(FormBuilder);
  private appService = inject(AppService);

  ngOnInit() {
    this.roleForm = this.fb.group({
      country: ['', Validators.compose([Validators.required])],
    });
  }

  onRoleChange(role: any) {
    let selected = role.target.value;
    this.selectedRole = selected;

    this.appService.subjectRole$.next(selected);
    this.appService.behaviorSubjectRole$.next(selected);
  }
}
