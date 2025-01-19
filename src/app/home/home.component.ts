import { Component, OnInit} from '@angular/core';
import { CarRecordComponent } from "../car-record/car-record.component";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceRecordComponent } from "../service-record/service-record.component";
import { CarService } from '../car.service';
import { notificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  imports: [CarRecordComponent, FormsModule, ReactiveFormsModule, ServiceRecordComponent],
  template: `
    <p>
      Car details
    </p>
    <section>
      <form>
        <input [formControl]="searchControl" type="text" placeholder="filter by car model">
        <button class="primary" type="button" (click)="onSearch()" >Search</button>
        </form>
    </section>
    <section>
      <form>
      <input [formControl]="ageControl" type="number" placeholder="export by car age ">
      <button class="primary" type="button" (click)="onExport()" >Export</button>
      </form>
    </section>
    <section class="results">
      <app-car-record [SearchText]="searchText"></app-car-record>
    </section>
    <p>
      Car Service Records
    </p>
    <section>
    <form>
      <input [formControl]="serviceControl" type="string" placeholder="Search by Car VIN ">
      <button class="primary" type="button" (click)="onServiceSearch()" >Search</button>
      </form>
      <section>
        <app-service-record [SearchCar]="searchCar"></app-service-record>
      </section>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent{
  constructor(private readonly carService: CarService){}
  ngOnInit(): void {

    
    
  }
  searchControl = new FormControl('')
  ageControl = new FormControl('');
  serviceControl = new FormControl('')
  searchText: string = '';
  searchCar: string='';

  onExport() {
    
    const age = this.ageControl.value || '';

    this.carService.exportCars(parseInt(age,10))
    this.ageControl.reset()
    

    }
  
 
    
  

  onSearch(): void {
  this.searchText = this.searchControl.value || '';
  console.log(this.searchText) 
}

  onServiceSearch():void{
    this.searchCar = this.serviceControl.value || '';
    
    
  }


}
