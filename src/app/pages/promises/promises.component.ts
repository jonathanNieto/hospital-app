import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.contarTres().then(
      (msj) => console.log("Termino la promesa", msj)
    ).catch((error) => {
      console.log({ error });
    })
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        console.log({ count });
        if (count === 3) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  }
}
