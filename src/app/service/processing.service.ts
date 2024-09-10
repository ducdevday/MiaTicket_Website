import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessingService {
  private visibilitySource = new BehaviorSubject<boolean>(false);
  public isVisible$ = this.visibilitySource.asObservable();

  show() {
    this.visibilitySource.next(true);
  }

  hide() {
    this.visibilitySource.next(false);
  }
}
