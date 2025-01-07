import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CarRecord } from '../car-record';
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-car-record',
  imports: [CommonModule],
  templateUrl: './car-record.component.html',
  styleUrl: './car-record.component.css'
})
export class CarRecordComponent implements OnChanges{

  @Input() SearchText:string = '';
  cars: any[] = [];
  loading = true;
  take = 10;
  skip = 0;

  

  constructor(private carService: CarService) {}

  ngOnInit(){
    this.carService.getCarsOnint().subscribe((response)=>{
      this.cars = response.data.findAll
      console.log(response.data)
      this.loading=false;
    });
  }


  ngOnChanges(changes: SimpleChanges):void {

  if (changes['SearchText'] && !changes['SearchText'].firstChange) {
      this.fetchCars();
    } 
  }  
  private fetchCars():void{  
  console.log("component loaded")
  const search = this.SearchText || '';
  this.carService.getCars(this.take, this.skip , search).subscribe((response)=>{
    this.cars = response.data.findAllwithpagination
    console.log(response.data)
    this.loading=false;
  });
  }
}

