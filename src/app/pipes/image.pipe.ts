import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, collection: string = 'users'): any {
    const url = environment.url + '/img';
    if (!image) {
      return url + '/users/no-image';
    }
    if (image.startsWith('http')) {
      return image;
    }

    if (collection === 'users' ||
      collection === 'doctors' ||
      collection === 'hospitals') {
      return `${url}/${collection}/${image}`;
    } else {
      return url + '/users/no-image';
    }

  }

}
