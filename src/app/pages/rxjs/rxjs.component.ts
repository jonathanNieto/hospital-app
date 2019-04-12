import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, throwError, Subscriber, pipe, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {
    this.subscription = this.returnObservable().pipe()
      .subscribe(
        (num) => console.log('Subs', num),
        (error) => console.log('Error en el obs', error),
        () => console.log('El observador termino')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('se va cerrar esta pagina');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        const salida = {
          value: count
        };
        observer.next(salida);
        if (count === 30) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    }).pipe(
      map((response) => response.value),
      filter((value, index) => value % 2 === 0 ? false : true)
    );
  }
}
