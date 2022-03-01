import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { Course } from '../models/course';
import { Mentor } from '../models/mentor';
import { CategoryService } from '../services/category.service';
import { CourseService } from '../services/course.service';
import { MentorService } from '../services/mentor.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styles: [
  ]
})
export class CourseComponent implements OnInit {
  mentor : Mentor[] | any;
  category : Category[] | any;
  id : number | any = null;

  courseForm: FormGroup;

  constructor(private courseService : CourseService,
    private categoryService : CategoryService,
    private mentorService : MentorService,
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private toastr: ToastrService) 
    { 
      this.courseForm = this.fb.group({
        id : [0,[]],
        name: [null, Validators.required],
        summary: [null, Validators.required],
        description: [null, Validators.required],
        sequence: [null, Validators.required],
        imageUrl: [null, [Validators.required]],
        demoUrl: [null, [Validators.required]],
        url: [null, [Validators.required]],
        unitPrice: [null, [Validators.required]],
        difficultyType: [null, [Validators.required]],
        isActive: [false, []],
        categoryId: [null, [Validators.required]],
        mentorId: [null, [Validators.required]],
        });

        route.params.subscribe(param =>{
            this.id = param['id'];
        });
    }

  ngOnInit(): void {
    
    this.categoryService.GetCategories().subscribe(res=>{
      this.category = res.body
    })

    this.mentorService.GetMentors().subscribe(res=>{
      this.mentor = res.body;
    })
    
    if(this.id != null)
    {
      this.courseService.GetCourseByID(this.id).subscribe(res => {
        this.courseForm.setValue({
          id: this.id,
          name : res.name,
          categoryId : res.categoryId,
          mentorId : res.mentorId,
          summary : res.summary,
          description : res.description,
          sequence : res.sequence,
          imageUrl : res.imageUrl,
          demoUrl : res.demoUrl,
          url : res.url,
          unitPrice : res.unitPrice,
          difficultyType : res.difficultyType,
          isActive : res.isActive,
        });
        console.log(res);
      });
    }
  }
  onCourseAdd(){
    const course = this.courseForm.value;
    if(this.id == null)
    {
      this.courseService.AddCourse(course).subscribe(res => {
       if (res.status == 201)
       {
          this.showSuccess();
          this.router.navigate(['show']);
       }
      });
    }
    else{
      this.courseService.UpdateCourse(course).subscribe(res => {
        if (res.status == 200)
          this.showSuccess();
          this.router.navigate(['show']);
       });
    }
  }

  showSuccess() {
    if(this.id == null)
      this.toastr.success('Course Added Successfully!');
    else
      this.toastr.success('Course Updated Successfully!');
  }

  resetForm(){
    var form = document.getElementById("formCourse") as HTMLFormElement;
    form.reset();
  }
}
