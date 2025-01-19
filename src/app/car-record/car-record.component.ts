import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CarRecord } from '../car-record';
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-car-record',
  imports: [CommonModule, MatPaginatorModule, FormsModule, ReactiveFormsModule, MatTableModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,],
  templateUrl: './car-record.component.html',
  styleUrl: './car-record.component.css',
})
export class CarRecordComponent implements OnChanges {

onClickServiceRecords(car:CarRecord){

  this.viewServiceRecords(car.vin)
  car.showServiceRecords=!car.showServiceRecords

}


viewServiceRecords(vin:string) {
  this.carService.getServiceRecords(vin).subscribe((res) => {
    this.serviceRecords = res.data.FindCarServiceRecordByVIN
  })
}
  @Input() SearchText: string = '';
  cars: any[] = [];
  serviceRecords: any[] = [];
  loading = true;
  take = 10;
  skip = 0;
  totalVehicles = 0;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'carMake', 'options'];

  InputID = new FormControl('');
  InputFirstNme = new FormControl('');
  InputLastName = new FormControl('');
  InputEmail = new FormControl('');
  InputCarMake = new FormControl('');
  InputModel = new FormControl('');
  InputVin = new FormControl('');
  InputYear = new FormControl('');
  InputAge = new FormControl('');

  constructor(private carService: CarService) {}

  ngOnInit() {
    // this.carService.getCarsOnint().subscribe((response)=>{
    //   console.log("subscribed")
    //   this.cars = response.data.findAll
    //   console.log(response.data)
    //   this.loading=false;
    // }) ;
    this.fetchCars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['SearchText'] && !changes['SearchText'].firstChange) {
      this.fetchCars();
    }
  }

  private fetchCars(): void {
    console.log('component loaded');
    const search = this.SearchText || '';
    this.carService
      .getCars(this.take, this.skip, search)
      .subscribe((response) => {
        this.cars = response.data.findAllwithpagination.carRecord.map((car:CarRecord) => ({
          ...car,
          isEdit: false, 
          showServiceRecords:false,
          // setting Default value for isEdit and showServiceRecords
        })); // works also without this. but how ????
        //populate totoal variable
        // console.log(response.data);
        console.log(JSON.stringify(response.data));
        this.loading = false;
        this.totalVehicles = response.data.findAllwithpagination.total;
      });
  }

  onPageChange(event: PageEvent) {
    // console.log(event)
    // console.log(JSON.stringify(event))
    this.skip = event.pageIndex * event.pageSize;
    this.take = event.pageSize;
    this.fetchCars();
  }

  onClickUpdateBtn(data: any) {
    data.isEdit = !data.isEdit;
  }

  updateCars(data: CarRecord) {
    
    const InputFirstNme = this.InputFirstNme.value || data.firstName;
    const InputLastName = this.InputLastName.value || data.lastName;
    const InputEmail = this.InputEmail.value || data.email;
    const InputCarMake = this.InputCarMake.value || data.carMake;
    const InputModel = this.InputModel.value || data.carModel;
    const InputVin = this.InputVin.value || data.vin;
    const InputYear =new Date(String(this.InputYear.value)) || data.manufacturedDate;
    const InputAge = Number(this.InputAge.value) || data.ageOfVehicle;
    data.isEdit = !data.isEdit;

    console.log(this.InputFirstNme);
    this.carService
      .updateCars(
        data.id,
        InputFirstNme,
        InputLastName,
        InputEmail,
        InputCarMake,
        InputModel,
        InputVin,
        InputYear,
        InputAge
      )
      .subscribe((response) => {
        // this.cars = response.data.findAllwithpagination.carRecord
        //populate totoal variable
        console.log(response.data);
        console.log(JSON.stringify(response.data));
        this.loading = false;
        this.InputFirstNme.reset();
        this.InputLastName.reset();
        this.InputEmail.reset();
        this.InputCarMake.reset();
        this.InputModel.reset();
        this.InputVin.reset();
        this.InputYear.reset();
        this.InputAge.reset();
        this.fetchCars()
        // this.totalVehicles=response.data.findAllwithpagination.total
      });
  }

  deleteCars(id:string) {
    this.carService.deleteCars(id).subscribe(() => {
      this.fetchCars()
    })
  }
}
