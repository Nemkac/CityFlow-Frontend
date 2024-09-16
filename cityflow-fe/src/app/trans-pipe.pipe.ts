import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transPipe',
  standalone: true
})
export class TransPipePipe implements PipeTransform {

  transform(value: string): string {
    if(localStorage.getItem('lang') == 'eng') {
    switch(value) {
      case 'Malfunction report':
        return 'Prijava kvara'
        break;
      case 'Please rate the priority of malfunction resolving':
        return 'Odrediti ozbiljnost kvara koji je nastupio'
        break;
      case 'Selected priority:' :
        return 'Odabrana vrednost ozbiljnosti :'
      case 'Describe what happened':
        return 'Objasnite sta se desilo'
      default :
        return '';
        break;
    }
  } else {
    return '';
  }



    }
  }


