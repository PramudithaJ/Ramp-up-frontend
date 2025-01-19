import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';



@Injectable({ providedIn: 'root' })
export class notificationService {
  constructor(private socket: Socket) {}
  listen(event: string) {
    return this.socket.fromEvent(event);
  }
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
