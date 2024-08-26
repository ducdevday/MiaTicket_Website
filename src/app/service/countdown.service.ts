import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdown$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  startCountdown(seconds: number): Observable<number> {
    return interval(1000).pipe(
      map((i) => seconds - i),
      takeWhile((x) => x >= 0),
      map((timeLeft) => {
        this.countdown$.next(timeLeft);
        return timeLeft;
      })
    );
  }

  getCountdown(): Observable<number> {
    return this.countdown$.asObservable();
  }
}
