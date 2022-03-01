import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  
  course : Course[] | any
  toastContainer: ToastContainerDirective | undefined

  constructor(private courseService : CourseService,
    private toastrService: ToastrService) { 
  }

  ngOnInit(): void {
    this.courseService.GetCourses().subscribe(res=>{
      this.course = res;
    })
    this.toastrService.overlayContainer = this.toastContainer;
  }

  onDeleteCourse(id : number){
    this.courseService.DeleteCourse(id).subscribe(res =>{
      this.refreshPage();
      this.toastrService.success('Course Deleted Successfully!');
    });
  }

  refreshPage(){
    this.courseService.GetCourses().subscribe(res=>{
      this.course = res;
    })
  }
}
