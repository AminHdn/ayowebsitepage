
import { EventEmitter, Injectable,Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareAbleService {
@Output()  change:EventEmitter<any> = new EventEmitter();

sendData(data:any){
  this.change.emit(data);

}

 
}
