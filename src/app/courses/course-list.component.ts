import { CourseService } from './course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from './course';

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

    filteredCourses: Course[] = [];

    // tslint:disable-next-line:variable-name
    _courses: Course[] = [];

    // tslint:disable-next-line:variable-name
    _filterBy: string;

    constructor(private courseService: CourseService) {

    }

    ngOnInit(): void {
        this.retrieveAll();
    }

    retrieveAll(): void {
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log(`Error: ${err}`)
        });
    }

    set filter(value: string) {
        this._filterBy = value;

        this.filteredCourses = this._courses
        .filter((course: Course) => {
            return course.name.toLocaleLowerCase()
                .indexOf(this._filterBy.toLocaleLowerCase()) > -1;
        });
    }
    get fitler(): string {
        return this._filterBy;
    }
}
