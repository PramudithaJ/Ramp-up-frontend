import { Component } from '@angular/core';
import { notificationService } from '../notification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  message: string = '';

  alertSubscription!: Subscription;

constructor(private readonly notificationService:notificationService){}

ngOnInit(){
  this.alertSubscription = this.notificationService.listen('VehicleReport').subscribe((message: any) => {
  this.message = message.text;


  setTimeout(() => {
    
  }, 5000);
});
}

ngOnDestroy(): void {
  if (this.alertSubscription) {
    this.alertSubscription.unsubscribe();
  }
}

}
