import { Component, OnInit } from '@angular/core';
import { CarRecordComponent } from "../car-record/car-record.component";
import { CarService } from '../car.service';
import { CarRecord } from '../car-record';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CarRecordComponent, FormsModule, ReactiveFormsModule],
  template: `
    <p>
      Car details
    </p>
    <section>
      <form>
        <input [formControl]="searchControl" type="text" placeholder="filter by name">
        <button class="primary" type="button" (click)="onSearch()" >Search</button>
        </form>
    </section>
    <section class="results">
      <app-car-record [SearchText]="searchText"></app-car-record>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchControl = new FormControl('')
  searchText: string = '';

  ngOnInit(): void {}
    
  constructor(private readonly carService: CarService){}

  onSearch(): void {
  this.searchText = this.searchControl.value || '';
  console.log(this.searchText) 
}


}
