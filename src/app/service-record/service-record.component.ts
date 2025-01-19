import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../car.service';
import { CarServiceRecord } from '../car-service-record';

@Component({
  selector: 'app-service-record',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './service-record.component.html',
  styleUrl: './service-record.component.css'
})
export class ServiceRecordComponent implements OnInit{
updateRecords(_t17: any) {
throw new Error('Method not implemented.');
}


@Input() SearchCar: string = '';
records: any[]=[];
loading: boolean = false;

inputVIN = new FormControl('')
inputCost = new FormControl('')
inputDateOfService = new FormControl('')

constructor(private carService: CarService) {}
  ngOnInit(): void {
    // this.fetchRecords()
  }

ngOnChanges(changes: SimpleChanges): void {
  if(changes['SearchCar'] && !changes['SearchCar'].firstChange){
    this.fetchRecords()
  }
}
  fetchRecords():void {
    const searhCar = this.SearchCar || '';

    if(searhCar===''){
      this.loading=false;
      alert
      // this.carService.getAllServiceRecords().subscribe((res) => {
      //   this.records = res.data.FindAllcarServiceRecord
      // })
    }
    else{
    this.loading=true
    this.carService
    .getServiceRecords(searhCar)
    .subscribe((response) => {
      console.log(JSON.stringify(response.data));
        this.records = response.data.FindCarServiceRecordByVIN.map((record:CarServiceRecord) => ({
          ...record,
          isEdit:false, //setting isEdit false for display purposes. need to check whether works without setting
        }))



    });
  }

  }

  deleteCarRecords(id:string) {
      this.carService.deleteServiceRecords(id).subscribe(() => {
        this.fetchRecords()
      })
    }

    onClickUpdateBtn(record: CarServiceRecord) {
     record.isEdit=!record.isEdit
    }

}
